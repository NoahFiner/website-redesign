import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ShaderCanvas } from "./ShaderCanvas";
import { frag, introFrag } from "./frag/frag";
import logo from "./img/logo-black.png";
import bridge from "./img/intro/bridge.jpg";
import moraine from "./img/intro/moraine.jpg";
import yosemite from "./img/intro/yosemite.jpg";
import lizards from "./img/intro/lizards.jpg";
import SquigglyBoyo from "./img/Squiggle";

type IntroContent = {
  title: string;
  content: React.ReactElement;
};

const MAX_SCROLL_IDX = 3;

export default function Home() {
  const [effect, setEffect] = useState(0);

  const [visibleIdx, setVisibleIdx] = useState(0);

  const onScroll = useCallback(() => {
    let scroll = window.scrollY;
    if (scroll < window.innerHeight) scroll += 300;
    let shouldShow = Math.floor((scroll + 50) / window.innerHeight) - 1;

    if (visibleIdx !== shouldShow) {
      setVisibleIdx(shouldShow);
    }
  }, [visibleIdx, setVisibleIdx]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const animateDelaysJIT = [
    "animate-delay-[0s]",
    "animate-delay-[0.4s]",
    "animate-delay-[0.8s]",
    "animate-delay-[1.2s]",
    "animate-delay-[1.6s]",
  ];

  const makeTitleCool = (title: string): React.ReactElement => {
    if (!title.length) return <></>;
    return (
      <div>
        {title.split("").map((a, idx) => {
          if (a === "*") {
            return <br />;
          } else {
            const delayClass = animateDelaysJIT[idx % animateDelaysJIT.length];
            return (
              <span className={`animate-wiggle inline-block ${delayClass}`}>
                {a}
              </span>
            );
          }
        })}
      </div>
    );
  };

  const intros: IntroContent[] = [
    {
      title: "It's*me",
      content: (
        <>
          <p className="delay-100">oh snap you scrolled down! good job</p>
          <p className="delay-200">
            i am noah. i’m from boulder co, live in san francisco, and work at
            figma on web stuff (if you couldn’t tell)
          </p>
        </>
      ),
    },
    {
      title: "Thi*ngs",
      content: (
        <>
          <p className="delay-100">
            i’ve made some cool things in the past. these include some web
            games, generative art, and cringe failed startups.
          </p>
          <p className="delay-200">
            i also published some heat on spotify, anonymously ran a viral meme
            page, and co-directed a creator space
          </p>
        </>
      ),
    },
    {
      title: "Pho*tos",
      content: (
        <>
          <p className="delay-100">
            i enjoy doing outdoor things and taking photos. i’ve owned 9
            different instagram accounts.
          </p>
          <p className="delay-200">
            these photos are generally of rocks, trees, and sometimes people if
            they want that.
          </p>
        </>
      ),
    },
    {
      title: "Liza*rds",
      content: (
        <>
          <p className="delay-100">
            i own two very good boys — spiky1 (RIP) and spiky2. they eat sleep
            and poop.
          </p>
          <p className="delay-200">
            spiky1 eats mealworms and blueberries. spiky2 eats baby food and
            crickets. they refuse to eat anything else.
          </p>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="w-screen h-screen relative bg-secondary">
        <div className="w-full h-full absolute">
          <ShaderCanvas
            frag={frag}
            setUniforms={{
              u_textureX: 923.1,
              u_textureY: 934.1,
              texture0: logo,
              u_effectType: effect,
            }}
          ></ShaderCanvas>
        </div>
        <div className="w-full h-full flex relative flex-col justify-center items-end md:px-12 p-4">
          <Link to="/me">
            <p
              className="text-primary p-4 min-w-36 text-xl text-right hover:bg-primary hover:text-secondary"
              onMouseEnter={() => setEffect(1)}
              onMouseLeave={() => setEffect(0)}
            >
              me
            </p>
          </Link>
          <Link to="/projects">
            <p
              className="text-primary p-4 min-w-36 text-xl text-right hover:bg-primary hover:text-secondary"
              onMouseEnter={() => setEffect(2)}
              onMouseLeave={() => setEffect(0)}
            >
              projs
            </p>
          </Link>
          <Link to="/pics">
            <p
              className="text-primary p-4 min-w-36 text-xl text-right hover:bg-primary hover:text-secondary"
              onMouseEnter={() => setEffect(3)}
              onMouseLeave={() => setEffect(0)}
            >
              pics
            </p>
          </Link>
        </div>
        <div className="w-full fixed bottom-0 h-24 z-10">
          <div
            className={`arrowouter h-16 w-16 ml-auto right-8 bottom-8 relative cursor-pointer transform translate-y-0 hover:translate-y-2 transition-transform ${
              visibleIdx === MAX_SCROLL_IDX ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => {
              if (visibleIdx === MAX_SCROLL_IDX) {
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                });
              } else {
                window.scroll({
                  top:
                    Math.floor(
                      (window.scrollY + window.innerHeight + 100) /
                        window.innerHeight
                    ) * window.innerHeight,
                  left: 0,
                  behavior: "smooth",
                });
              }
            }}
          >
            <SquigglyBoyo />
          </div>
        </div>
      </div>

      <div className="w-full h-full fixed -z-10 top-0">
        <ShaderCanvas
          frag={introFrag}
          setUniforms={{
            texture1: bridge,
            texture2: yosemite,
            texture3: moraine,
            texture4: lizards,
            u_effectType: effect,
          }}
        ></ShaderCanvas>
      </div>

      {intros.map((intro, idx) => (
        <div
          className={`w-[80vw] max-w-xl h-screen relative text-primary flex flex-wrap justify-start items-between p-8 md:p-16`}
        >
          <h1
            className={`font-basteleur text-[6rem] md:text-[12rem] leading-[0.75] drop-shadow-intro transition-all duration-300 ${
              idx === visibleIdx
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            {makeTitleCool(intro.title)}
          </h1>
          <div
            className={`h-50 flex flex-wrap flex-col justify-end gap-8 [&>p]:drop-shadow-introbody font-bold
                      [&>p]:text-xl [&>p]:transition-all [&>p]:duration-300 ${
                        idx === visibleIdx
                          ? "[&>p]:opacity-100 [&>p]:translate-y-0"
                          : "[&>p]:opacity-0 [&>p]:-translate-y-4"
                      }`}
          >
            {intro.content}
          </div>
        </div>
      ))}
    </>
  );
}
