import { FC, useEffect, useRef } from "react";
import GlslCanvas from "glslCanvas";

// shout out https://dev.to/samasastudio/glsl-canvas-component-for-react-hooks-typescript-4p3c

interface ShaderCanvasProps {
  frag: string;
  setUniforms?: { [key: string]: string | number };
}

export const ShaderCanvas: FC<ShaderCanvasProps> = (props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sandboxRef = useRef<any>(null);

  const resizer = (
    canvas: HTMLCanvasElement,
    container: HTMLDivElement
  ): void => {
    canvas.width = container.clientWidth + window.devicePixelRatio;
    canvas.height = container.clientHeight + window.devicePixelRatio;
    canvas.style.width = container.clientWidth + "px";
    canvas.style.height = container.clientHeight + "px";
  };

  // deep comparison for the use effect
  const stringified = props.setUniforms
    ? JSON.stringify(props.setUniforms)
    : "";
  useEffect(() => {
    if (stringified) {
      const uniforms = JSON.parse(stringified);
      if (sandboxRef && sandboxRef.current) {
        for (let k in uniforms) {
          sandboxRef.current.setUniform(k, uniforms[k]);
        }
      }
    }
  }, [stringified]);

  useEffect(() => {
    const node = canvasRef.current;
    const container = containerRef.current;
    const sandbox = new GlslCanvas(canvasRef.current);
    sandboxRef.current = sandbox;
    if (!node || !container) return;

    resizer(node, container);
    sandbox.load(props.frag);

    for (let k in props.setUniforms) {
      sandbox.setUniform(k, props.setUniforms[k]);
    }

    const handler = () => {
      if (
        canvasRef.current &&
        containerRef.current &&
        (node.clientWidth !== container.clientWidth ||
          node.clientHeight !== container.clientHeight)
      )
        resizer(canvasRef.current, containerRef.current);
    };

    const scroll = () => {
      sandbox.setUniform("u_scroll", window.scrollY / window.innerHeight);
    };
    scroll();
    handler();

    window.addEventListener("resize", handler);
    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", scroll);
    };
    // shhhhhhhhh
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} style={{ height: "100%", width: "100%" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
