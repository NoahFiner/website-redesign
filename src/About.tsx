import me from "./img/pic.jpg";

export default function AboutContent() {
  return (
    <div className="w-screen min-h-screen relative flex md:flex-row flex-col justify-center item-center">
      <div className="w-full md:w-[30rem] h-auto flex items-center">
        <div className="[&>p]:my-8 [&>p]:mx-4 [&>p]:text-primary p-4 relative">
          <p className="font-bold">yeah you heard it</p>
          <p>i’m noah finer, i work at figma and live in san francisco</p>
          <p>that is a picture of me (nice)</p>
          <p>here's some links i couldn't find another spot for</p>
          <div className="flex flex-wrap max-w-[30rem] justify-start items-center w-full p-4 gap-2">
            <a
              href="https://www.linkedin.com/in/noahfiner/"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4 border-2 border-primary"
            >
              linkedin
            </a>
            <a
              href="https://twitter.com/finerflame"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4 border-2 border-primary"
            >
              inactive twitter (or X)
            </a>
            <a
              href="https://github.com/noahfiner"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4 border-2 border-primary"
            >
              github
            </a>
            <a
              href="mailto:noahfiner@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4 border-2 border-primary"
            >
              email me
            </a>
            <a
              href="https://old.noahfiner.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4 border-2 border-primary"
            >
              old portfolio site from 2016
            </a>
          </div>
        </div>
      </div>
      <div className="md:w-80 relative md:my-auto ">
        <img className="w-60 h-auto m-auto" alt="ya boi" src={me} />
      </div>
    </div>
  );
}
