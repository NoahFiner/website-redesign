import { ShaderCanvas } from "./ShaderCanvas";
import { miniFrag } from "./frag/frag";
import me from "./img/pic.jpg";

export default function ProjectsContent() {
  return (
    <div className="w-screen min-h-screen relative flex">
      <div className="w-[30rem] h-auto flex items-center">
        <div className="[&>p]:m-8 [&>p]:text-primary p-4 relative">
          <p className="font-bold">what's up</p>
          <p>i’m noah finer, i work at figma and live in san francisco</p>
          <p>
            i’ve screwed around in photography, the web, music, and meme pages
          </p>
          <p>
            i got some cute lizards, spiky1 (rip) and spiky2. i am now trying to
            take care of trader joe’s plants
          </p>
          <div className="flex flex-wrap max-w-[30rem] justify-start items-center w-full p-4">
            <a
              href="https://instagram.com/noahfiner"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4"
            >
              @noahfiner
            </a>
            <a
              href="https://instagram.com/spiky1and2"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4"
            >
              @spiky1and2
            </a>
            <a
              href="https://instagram.com/finer.photo"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4"
            >
              @finer.photo
            </a>
            <a
              href="https://open.spotify.com/artist/6logsn6gZDzDoEdZvnKn1d?si=a3q_KSXvRl2v3GIyQIEDPw"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4"
            >
              spotify
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
