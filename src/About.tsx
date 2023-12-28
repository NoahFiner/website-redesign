import { ShaderCanvas } from "./ShaderCanvas";
import { miniFrag } from "./frag/frag";
import me from "./img/pic.jpg";

export default function AboutContent() {
  return (
    <div className="w-screen min-h-screen relative flex md:flex-row flex-col justify-center item-center">
      <div className="w-[30rem] h-auto flex items-center">
        <div className="[&>p]:m-8 [&>p]:text-primary p-4 relative">
          <p className="font-bold">yeah you heard it</p>
          <p>i’m noah finer, i work at figma and live in san francisco</p>
          <p>that is a picture of me (nice)</p>
          <p>you should click on the links below</p>
          <div className="flex flex-wrap max-w-[30rem] justify-start items-center w-full p-4">
            {/* TODO need my resume */}
            <a
              href="https://google.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4"
            >
              resume
            </a>
            <a
              href="https://open.spotify.com/artist/6logsn6gZDzDoEdZvnKn1d?si=jve52Ch-T6e9jcb7MK5VMQ"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4"
            >
              mc finer flame
            </a>
            <a
              href="https://finer.photo"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4"
            >
              finer.photo
            </a>
          </div>
        </div>
      </div>
      <div className="md:w-80 relative md:my-auto ">
        <div className="md:w-32 md:h-[20rem] w-[10rem] h-24 right-[6rem] top-[-2rem] md:right-0 absolute -z-10">
          <div className="w-full h-full relative">
            <ShaderCanvas frag={miniFrag}></ShaderCanvas>
          </div>
        </div>
        <img className="w-60 h-auto m-auto" alt="ya boi" src={me} />
      </div>
    </div>
  );
}
