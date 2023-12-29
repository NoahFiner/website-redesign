const includes = `
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise2d(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(random(ip),random(ip+vec2(1.0,0.0)),u.x),
        mix(random(ip+vec2(0.0,1.0)),random(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
`;

export const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D texture0;
uniform float u_textureX;
uniform float u_textureY;

uniform float u_scroll;

uniform float seed;

uniform float u_effectType;

varying vec2 v_texcoord;

#define NUM_OCTAVES 5

${includes}

float fbm (in vec2 st, in float extra) {
    // Initial values
    float value = 0.0;
    float amplitude = .6;
    float frequency = 0.;

    for (int i = 0; i < 2; i++) {
        value += amplitude * noise(st)*1.1 + extra;
        st *= 3.4;
        amplitude *= 0.5;
    }
    return value;
}

void main(void)
{
    
    float textureAspect = u_textureX / u_textureY;
    float frameAspect = u_resolution.x / u_resolution.y;
    
    float scaleX = 1., scaleY = 1.;
    float textureFrameRatio = textureAspect / frameAspect;
    bool portraitTexture = textureAspect < 1.;
    bool landscapeFrame = u_resolution.x >= u_resolution.y;
    
    if(landscapeFrame)
        scaleX = 1. / textureFrameRatio;
    else
        scaleY = textureFrameRatio;

    vec2 uv = v_texcoord;
    uv.y *= -1.;

    vec2 mouse = u_mouse / u_resolution;
    mouse.y *= -1.;

    float dist = mix(0., 1., distance(mouse, uv));

    vec4 foreground = vec4(0.7098039216,0.8137254902,0.5098039216,1.0);
    vec4 background = vec4(0.275,0.275,0.1,1.0);

    // vec4 background1 = vec4(0.3,0.3,0.0,1.0);
    // vec4 background2 = vec4(0.1,0.3,0.1,1.0);
    // vec4 background3 = vec4(0.0,0.3,0.2,1.0);
    vec4 background1 = vec4(0.24,0.2,0.25,1.0);
    vec4 background2 = vec4(0.2666666667,0.2156862745,0.1882352941,1.0);
    vec4 background3 = vec4(0.2666666667,0.2156862745,0.1282352941,1.0);

    if(u_effectType == 1.) {
        background = background1;
    } else if(u_effectType == 2.) {
        background = background2;
    } else if(u_effectType == 3.) {
        background = background3;
    }

    vec2 scale = vec2(scaleX, scaleY);
    vec2 image_uv = 1. * v_texcoord * scale;
    // image_uv.y = 1.-image_uv.y; 
    image_uv += vec2(sin(uv.y + u_time*2.) * 0.02, sin(uv.x*3. + u_time) * 0.03);
    image_uv *= 2.;
    if(landscapeFrame) {
        image_uv.y -= 0.5;
        image_uv.x -= 0.2;
    } else {
        image_uv.x -= 0.1;
        image_uv.y -= 0.1;
    }

    float image_dist = mix(0., 1., distance(vec2(mouse.x, -mouse.y), image_uv));
    image_uv += 0.1*image_dist - 0.05;
    
    float extra = -0.1 + 1./(u_time*4. + 0.1);
    
    vec4 image_color = texture2D(texture0, image_uv);
    if(image_uv.x <= 0. || image_uv.y <= 0. || image_uv.x >= 1. || image_uv.y >= 1.) {
        image_color = vec4(0., 0., 0., 0.);
    }
    
    image_color[3] = step(0.2, image_color[3]);
    
    if(image_color[3] <= 0.5) {
        extra = 0.3 + 1./u_time * 0.05;
    }

    extra += u_scroll * 0.5;
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float noise = noise2d(sin(uv * u_time)*10000. + 300.)*2.0;
    
    vec3 color = vec3(0.0);
    float weirdTime = sin(u_time*3.0 + image_color[3]*5.0)*1. + 300. - image_color[3]*200. + 1./(.05 + u_time*.3)*.3 + 10.;
    
    weirdTime += noise*1.0;
    
    color += fbm(mix(vec2(0.06), vec2(0.14), vec2(fbm(vec2(fbm(st*1.0, dist*0.001)*0.05*weirdTime, image_color*fbm(st*0.1*weirdTime, extra + dist * 0.0)), extra + dist*0.05)))*weirdTime*0.3, extra + dist*0.0);
    vec4 background_color = mix(foreground, background, clamp(vec4(color + uv.x/2.5, 1.0), 0.0, 1.5));
    
    gl_FragColor = background_color;
}
`;

export const miniFrag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D prevFrame;
uniform sampler2D prevPass;

uniform float u_scroll;

uniform vec2 textureScale;

varying vec3 v_normal;
varying vec2 v_texcoord;

${includes}

float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < 6; i++) {
        value += amplitude * abs(noise(st) - 0.5)*3.;
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

void main(void)
{
    vec2 st = gl_FragCoord.xy/u_resolution.xy;  
    st.x *= u_resolution.x/u_resolution.y;

    vec2 mouse = u_mouse / u_resolution;

    float dist = distance(vec2(2.*mouse.x - 1., 1. - 2.*mouse.y), st);
    float scroll = u_scroll;
    
    vec2 uv = -1. + 2. * v_texcoord;

    vec4 foreground = vec4(0.7098039216,0.8137254902,0.5098039216,1.0);
    vec4 background = vec4(0.275,0.275,0.1 + scroll - 1.0,1.0);
    
    vec2 forFbm = st * 1.;
    
    float fbmified = fbm(vec2(fbm(forFbm), fbm(vec2(st.y, st.x)))*20. + u_time + scroll*10. + dist*0.03);
    
    gl_FragColor = mix(foreground, background, fbmified);
}
`;

export const introFrag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D texture1;
vec2 image1_size = vec2(2000., 1370.);
uniform sampler2D texture2;
vec2 image2_size = vec2(2000., 1470.);
uniform sampler2D texture3;
vec2 image3_size = vec2(2000., 1333.);
uniform sampler2D texture4;
vec2 image4_size = vec2(2000., 1333.);

uniform sampler2D prevFrame;
uniform sampler2D prevPass;

varying vec3 v_normal;
varying vec2 v_texcoord;

uniform float u_scroll;

${includes}

float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < 3; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

vec2 get_image_uv(vec2 textureSize) {
    float textureAspect = textureSize.x / textureSize.y;
    float frameAspect = u_resolution.x / u_resolution.y;
    float scaleX = 1.;
    float scaleY = 1.;
    float extraX = 0.;
    float extraY = 0.;
    float textureFrameRatio = textureAspect / frameAspect;
    
    if(textureFrameRatio < 1.0) {
        scaleY = textureFrameRatio;
        extraY = (scaleY - 1.0) / 2.;
    } else {
        scaleX = 1. / textureFrameRatio;
        extraX = (scaleX - 1.0) / 2.;
    }

    vec2 image1_scale = vec2(scaleX, scaleY);
    vec2 image_uv = 1. * v_texcoord * image1_scale;
    // image_uv.y = 1. - image_uv.y;
    image_uv -= vec2(extraX, extraY);
    return image_uv;
}

vec4 mix3(vec4 color1, vec4 color2, vec4 color3, float amt) {
    float h = 0.5; // adjust position of middleColor
    vec4 final = mix(mix(color1, color2, amt/h), mix(color2, color3, (amt - h)/(1.0 - h)), step(h, amt));
    return final;
}

void main(void)
{

    vec4 middle_color = vec4(0.275,0.275,0.1,1.0);
//    vec4 middle_color = vec4(0.0,0.0,0.0,1.0);

    vec2 st = gl_FragCoord.xy/u_resolution.xy;  
    st.x *= u_resolution.x/u_resolution.y;

    vec2 mouse = u_mouse / u_resolution;

    float dist = distance(vec2(mouse.x, mouse.y), v_texcoord);

    // -1 means first texture, 1 means second texture
    float transitionAmt = smoothstep(0.1, 1.0, fract(u_scroll)) * 2.0 - 1.0;
    
    float adjustedTime = u_time*0.05;
    
    vec2 uv_fbm = (3. - 1.*v_texcoord);
    
    float noise = noise2d(sin(v_texcoord * u_time)*10000. + 300.)*1.0;
    
    float amount = fbm(vec2(adjustedTime*0.05, fbm(uv_fbm*1. * fbm(uv_fbm*3.0 + noise*0.04) + adjustedTime*0.3 + sin(transitionAmt*0.3))*50. + -0.6) + 4.0 + adjustedTime*0.2 + dist*2.0) + transitionAmt;

    // TODO @nfiner maybe i can make this faster by doing the texture2D within those if statements?
    
    
    // vec2 image1_uv = get_image_uv(image1_size);
    // vec2 image2_uv = get_image_uv(image2_size);
    // vec2 image3_uv = get_image_uv(image3_size);
    // vec2 image4_uv = get_image_uv(image4_size);
    
    vec4 first_image = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 second_image = vec4(0.0, 0.0, 0.0, 1.0);

    if(u_scroll <= 1.0) {
        vec2 image1_uv = get_image_uv(image1_size);
        second_image = texture2D(texture1, image1_uv);
    }
    if(u_scroll >= 1.0 && u_scroll <= 2.0) {
        vec2 image1_uv = get_image_uv(image1_size);
        vec2 image2_uv = get_image_uv(image2_size);

        first_image = texture2D(texture1, image1_uv);
        second_image = texture2D(texture2, image2_uv);    
    }
    if(u_scroll >= 2.0 && u_scroll <= 3.0) {
        vec2 image2_uv = get_image_uv(image2_size);
        vec2 image3_uv = get_image_uv(image3_size);

        first_image = texture2D(texture2, image2_uv);
        second_image = texture2D(texture3, image3_uv);
    }
    if(u_scroll >= 3.0 && u_scroll <= 4.0) {
        vec2 image3_uv = get_image_uv(image3_size);
        vec2 image4_uv = get_image_uv(image4_size);

        first_image = texture2D(texture3, image3_uv);
        second_image = texture2D(texture4, image4_uv);
    }
    if(u_scroll >= 4.0 && u_scroll <= 5.0) {
        vec2 image4_uv = get_image_uv(image4_size);

        first_image = texture2D(texture4, image4_uv);
        second_image = texture2D(texture4, image4_uv);
    }
//    if(scroll >= 3.5) {
//        first_image = texture2D(texture3, image3_uv);
//        second_image = texture2D(texture3, image3_uv);
//    }
    
    
    vec4 color = mix(first_image, second_image, clamp(amount, 0.0, 1.0));

    gl_FragColor = color;
}
`;

export const titleFrag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform sampler2D texture0;
uniform float image_size_x;
uniform float image_size_y;

uniform sampler2D prevFrame;
uniform sampler2D prevPass;

varying vec3 v_normal;
varying vec2 v_texcoord;

uniform float u_scroll;

${includes}

void main(void)
{
    float textureAspect = image_size_x / image_size_y;
    float frameAspect = u_resolution.x / u_resolution.y;
    float scaleX = 1.;
    float scaleY = 1.;
    float extraX = 0.;
    float extraY = 0.;
    float textureFrameRatio = textureAspect / frameAspect;
    
    bool landscapeFrame = u_resolution.x >= u_resolution.y;
    
    if(landscapeFrame) {
        scaleY = textureFrameRatio;
        extraY = (scaleY - 1.0) / 2.;
    } else {
        scaleX = 1. / textureFrameRatio;
        extraX = (scaleX - 1.0) / 2.;
    }

    vec2 image1_scale = vec2(scaleX, scaleY);
    image1_scale *= 1.5;
    
    vec2 extra_uv = (image1_scale - 1.0) / 2.;
    
    vec2 image_uv = 1. * v_texcoord * image1_scale;
    // image_uv.y = 1. - image_uv.y;
    image_uv += vec2(-extra_uv.x, -extra_uv.y);
    
    float noise = noise2d(sin(v_texcoord)*60. + 5.);
    
    vec2 distortionAmt = vec2(noise2d(image_uv*100.) - 0.5, noise2d(image_uv*100.) - 0.5)*vec2(u_scroll*1.7, u_scroll*0.4);
    
    image_uv += distortionAmt*noise;

    vec4 image_color = texture2D(texture0, image_uv);
    if(image_uv.x < 0. || image_uv.y < 0. || image_uv.x > 1. || image_uv.y > 1.) {
        image_color = vec4(0.0, 0.0, 0.0, 0.0);
    }
    
    gl_FragColor = image_color;
}
`;
