import meinwild from "./img/meinthewild.jpg";
import landscape from "./img/landscape.jpg";
import professional from "./img/professional.jpg";

export default function PicsContent() {
  return (
    <div className="w-screen min-h-screen relative p-8">
      <div className="hidden md:flex md:flex-row flex-col justify-center item-center gap-8">
        <img className="w-48 h-auto" alt="ya boi" src={meinwild} />
        <div className="w-full md:w-[30rem] h-auto flex items-center">
          <div className="[&>p]:my-8 [&>p]:text-primary relative">
            <p className="font-bold">oh snap!</p>
            <p>coding a gallery page from scratch is a lot of effort!</p>
            <p>check out these out for now</p>
          </div>
        </div>
      </div>
      <div className="mt-12 w-full flex md:flex-row flex-col justify-center items-center gap-24 flex-wrap">
        <a
          href="https://instagram.com/noahfiner"
          target="_blank"
          className="group relative w-72"
          rel="noreferrer"
        >
          <img
            className="w-72 h-auto m-auto transform transition-transform origin-center scale-100 group-hover:scale-105"
            alt="mountains"
            src={landscape}
          />
          <div className="w-48 h-24 absolute top-3 -left-8 bg-primary transform translate-x-0 translate-y-0 transition-transform group-hover:-translate-x-2 group-hover:translate-y-2"></div>
          <div className="w-48 h-24 absolute top-3 -left-8 p-4 flex justify-center items-center bg-secondary border-2 border-primary transform translate-x-0 translate-y-0 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
            <p>landscape pics on my instagram</p>
          </div>
        </a>
        <a
          href="https://finer.photo"
          target="_blank"
          className="group relative w-72"
          rel="noreferrer"
        >
          <img
            className="w-72 h-auto m-auto transform transition-transform origin-center scale-100 group-hover:scale-105"
            alt="mountains"
            src={professional}
          />
          <div className="w-48 h-24 absolute top-3 -left-8 md:bottom-3 md:-right-8 bg-primary transform translate-x-0 translate-y-0 transition-transform group-hover:-translate-x-2 group-hover:translate-y-2"></div>
          <div className="w-48 h-24 absolute top-3 -left-8 md:bottom-3 md:-right-8 p-4 flex justify-center items-center bg-secondary border-2 border-primary transform translate-x-0 translate-y-0 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
            <p>portraits & professional at finer.photo</p>
          </div>
        </a>
      </div>
    </div>
  );
}
