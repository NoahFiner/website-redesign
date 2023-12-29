import {
  CODE_PROJECTS,
  JQUERY_GAMES,
  NON_CODE_PROJECTS,
  Project,
} from "./projectsContent";

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className={`group w-full md:h-64 relative cursor-pointer`}
    >
      <div className="w-full h-full absolute bg-primary transform translate-x-0 translate-y-0 transition-transform group-hover:-translate-x-2 group-hover:translate-y-2"></div>
      <div
        className={`w-full h-full relative flex flex-col md:flex-row justify-around items-center p-8 gap-8 bg-secondary border-2 border-primary transform translate-x-0 translate-y-0 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2`}
      >
        <img
          src={project.imgSrc}
          alt={project.title}
          className="h-48 md:h-full w-auto"
        />
        <div className="flex-grow h-full flex flex-col justify-between items-start md:gap-0 gap-4">
          <div className="flex w-full relative justify-between items-center">
            <p className="font-bold p-2 -m-2">{project.title}</p>
            <p>{project.date}</p>
          </div>
          <p className="max-w-3/4">{project.content}</p>
        </div>
      </div>
    </a>
  );
}

export default function ProjectsContent() {
  return (
    <>
      <div className="w-screen min-h-screen relative p-8">
        <div className="lg:max-w-[900px] md:w-4/5 mx-auto">
          <div className="py-8">
            <h1 className="font-basteleur text-6xl md:text-8xl">fun stuff</h1>
            <p>
              some things i've done which i would describe as "cool" or "neat"
            </p>
          </div>
          <div className="flex w-full justify-start align-start flex-wrap gap-8 mb-16">
            {NON_CODE_PROJECTS.map((project) => (
              <ProjectCard project={project} key={project.title} />
            ))}
          </div>
          <div className="py-8">
            <h1 className="font-basteleur text-6xl md:text-8xl">code shit</h1>
            <p>
              here is some semi serious personal projects i put together in
              college and before
            </p>
          </div>
          <div className="flex w-full justify-start align-start flex-wrap gap-8 mb-16">
            {CODE_PROJECTS.map((project) => (
              <ProjectCard project={project} key={project.title} />
            ))}
          </div>
          <div className="pt-12 py-8">
            <h1 className="font-basteleur text-6xl md:text-8xl">
              jquery games from 2016
            </h1>
            <p>
              ah yes, the golden days when i wrote thousands of lines of jquery.
              deep noah lore ahead, only for the brave.
            </p>
          </div>
          <div className="flex w-full justify-start align-start flex-wrap gap-8 mb-16">
            {JQUERY_GAMES.map((project) => (
              <ProjectCard project={project} key={project.title} />
            ))}
          </div>
          <div className="mt-[100vh] mb-16">
            <h1 className="font-basteleur text-6xl md:text-8xl">
              the secret section
            </h1>
            <p>
              good job? you scrolled an entire {window.innerHeight}px of
              literally no content.
            </p>
            <p>as a reward, you found an easter egg</p>
            <a
              href="https://42069.noahfiner.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary hover:text-secondary p-4 -ml-4 underline"
            >
              "42069" by me. circa 2017
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/*
old component as a backup
<div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group w-full lg:max-w-[calc(50%-4rem)] h-64 relative cursor-pointer`}
    >
      <div className="w-full h-full absolute bg-primary transform translate-x-0 translate-y-0 transition-transform group-hover:-translate-x-2 group-hover:translate-y-2"></div>
      <div
        style={
          {
            "--image-url": `url(${project.imgSrc})`,
            "--green-url": `url(${green})`,
          } as React.CSSProperties
        }
        className={`w-full h-full relative bg-[image:var(--green-url)] border-2 border-primary flex flex-col justify-between items-start p-4 transform translate-x-0 translate-y-0 transition-all group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:bg-[image:var(--image-url)]`}
      >
        <div className="flex w-full relative justify-between items-center">
          <p className="font-bold bg-secondary p-2 -m-2">{project.title}</p>
          <p>{project.date}</p>
        </div>
        <p>{project.content}</p>
      </div>
    </div>
    


    const OFFSET = [10, 10];

function HoverPreview({ bgUrl }: { bgUrl?: string }) {
  const [coords, setCoords] = useState<[number, number]>([0, 0]);

  const width = 500;
  const height = 266;

  const isVisible = !!bgUrl;

  const onMove = useCallback(
    (e: MouseEvent) => {
      const baseCoords: [number, number] = [
        e.pageX + OFFSET[0],
        e.pageY - window.scrollY + OFFSET[1],
      ];
      if (baseCoords[0] < 0) {
        baseCoords[0] = 0;
      }
      if (baseCoords[1] < 0) {
        baseCoords[1] = 0;
      }
      if (baseCoords[0] + width > window.innerWidth) {
        baseCoords[0] = window.innerWidth - width;
      }
      if (baseCoords[1] + height > window.innerHeight) {
        baseCoords[1] = window.innerHeight - height;
      }

      setCoords(baseCoords);
    },
    [setCoords]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [onMove]);

  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0 z-10 pointer-events-none transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="relative"
        style={{
          width,
          height,
          transform: `translate(${coords[0]}px, ${coords[1]}px)`,
        }}
      >
        <div
          className={`w-4/5 h-4/5 absolute top-0 left-0 bg-cover bg-center`}
          style={{ backgroundImage: "url('" + bgUrl + "')" }}
        ></div>
        <div className="w-4/5 h-4/5 top-4 left-4 absolute -z-10">
          <div className="w-full h-full relative">
            <ShaderCanvas frag={miniFrag}></ShaderCanvas>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
