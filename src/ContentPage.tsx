import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ShaderCanvas } from "./ShaderCanvas";
import LogoRotating from "./img/Logo";
import { miniFrag, titleFrag } from "./frag/frag";

export function ContentPage({
  titleFragUniforms,
  children,
}: PropsWithChildren<{
  titleFragUniforms?: { [key: string]: string | number };
}>) {
  console.log(titleFragUniforms);
  return (
    <div className="bg-secondary">
      <div className="w-screen h-96 border-bottom-primary relative p-8">
        <div className="h-full flex relative right-0 justify-start flex-col items-end">
          <Link to="/">
            <div className="h-16 w-16 cursor-pointer">
              <LogoRotating width={64} />
            </div>
          </Link>
          <Link to="/me">
            <p className="text-primary p-2 min-w-24 text-right hover:bg-primary hover:text-secondary">
              me
            </p>
          </Link>
          <Link to="/projects">
            <p className="text-primary p-2 min-w-24 text-right hover:bg-primary hover:text-secondary">
              projs
            </p>
          </Link>
          <Link to="/pics">
            <p className="text-primary p-2 min-w-24 text-right hover:bg-primary hover:text-secondary">
              pics
            </p>
          </Link>
        </div>
        <div className="h-[8rem] top-[3rem] md:w-[calc(100vw-256px)] w-[calc(100vw-164px)] left-0 absolute -z-0">
          <div className="w-full h-full relative">
            <ShaderCanvas frag={miniFrag} />
          </div>
        </div>
        <div className="h-[16rem] top-[4rem] w-[30rem] md:w-[47rem] -left-4 md:left-8 absolute">
          <div className="w-full h-full relative">
            <ShaderCanvas frag={titleFrag} setUniforms={titleFragUniforms} />
          </div>
        </div>
      </div>
      <div className="h-screen w-screen ">{children}</div>
    </div>
  );
}
