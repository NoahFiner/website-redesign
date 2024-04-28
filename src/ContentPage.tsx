import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ShaderCanvas } from "./ShaderCanvas";
import { LogoRotating } from "./img/Logo";
import { miniFrag, titleFrag } from "./frag/frag";
import { useImagePreloader } from "./preload";

export function ContentPage({
  titleFragUniforms,
  selected,
  children,
  titleTexture = "",
}: PropsWithChildren<{
  selected?: "me" | "projects" | "pics";
  titleFragUniforms?: { [key: string]: string | number };
  titleTexture?: string;
}>) {
  const { imagesPreloaded } = useImagePreloader([titleTexture]);
  return (
    <div className="bg-secondary pb-12">
      <div className="w-screen h-52 md:h-72 border-bottom-primary relative p-8">
        <div className="h-full flex relative right-0 justify-start flex-col items-end">
          <Link to="/">
            <div className="h-16 w-16 cursor-pointer">
              <LogoRotating width={64} />
            </div>
          </Link>
          <Link to="/me">
            <p
              className={`text-primary text-lg p-2 md:text-base min-w-24 text-right hover:bg-primary hover:text-secondary ${
                selected === "me" ? "underline" : ""
              }`}
            >
              me
            </p>
          </Link>
          <Link to="/projects">
            <p
              className={`text-primary text-lg p-2 md:text-base min-w-24 text-right hover:bg-primary hover:text-secondary ${
                selected === "projects" ? "underline" : ""
              }`}
            >
              projs
            </p>
          </Link>
          <Link to="/pics">
            <p
              className={`text-primary text-lg p-2 md:text-base min-w-24 text-right hover:bg-primary hover:text-secondary ${
                selected === "pics" ? "underline" : ""
              }`}
            >
              pics
            </p>
          </Link>
        </div>
        <div className="h-[8rem] top-[3rem] md:w-[calc(100vw-256px)] w-[calc(100vw-164px)] left-0 absolute -z-0">
          <div className="w-full h-full relative">
            <ShaderCanvas frag={miniFrag} />
          </div>
        </div>
        <div
          className={`h-[8rem] sm:h-[16rem] top-[7rem] sm:top-[4rem] w-[20rem] sm:w-[30rem] md:w-[47rem] -left-4 md:left-8 absolute pointer-events-none transition-opacity duration-500 ${
            imagesPreloaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-full relative">
            <ShaderCanvas
              frag={titleFrag}
              setUniforms={{ ...titleFragUniforms, texture0: titleTexture }}
            />
          </div>
        </div>
      </div>
      <div className="h-screen w-screen ">{children}</div>
    </div>
  );
}
