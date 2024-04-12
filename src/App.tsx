import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContentPage } from "./ContentPage";
import Home from "./Home";
import AboutContent from "./About";
import projectsHeader from "./img/headers/projects.png";
import photosHeader from "./img/headers/photos.png";
import itmeHeader from "./img/headers/itme.png";
import ProjectsContent from "./Projects";
import PicsContent from "./Pics";
import { useImagePreloader } from "./preloadImages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/pics" element={<Pics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function About() {
  const {imagesPreloaded} = useImagePreloader([itmeHeader]);
  return (
    <ContentPage
      loaded={imagesPreloaded}
      titleFragUniforms={{
        texture0: itmeHeader,
        image_size_x: 993,
        image_size_y: 254,
      }}
      selected="me"
    >
      <AboutContent />
    </ContentPage>
  );
}

function Projects() {
  const {imagesPreloaded} = useImagePreloader([projectsHeader]);
  return (
    <ContentPage
      loaded={imagesPreloaded}
      titleFragUniforms={{
        texture0: projectsHeader,
        image_size_x: 1211,
        image_size_y: 296,
      }}
      selected="projects"
    >
      <ProjectsContent />
    </ContentPage>
  );
}

function Pics() {
  const {imagesPreloaded} = useImagePreloader([photosHeader]);
  return (
    <ContentPage
      loaded={imagesPreloaded}
      titleFragUniforms={{
        texture0: photosHeader,
        image_size_x: 1029,
        image_size_y: 242,
      }}
      selected="pics"
    >
      <PicsContent />
    </ContentPage>
  );
}

function NotFound() {
  return (
    <ContentPage loaded={true}>
      <h2>not found</h2>
    </ContentPage>
  );
}

export default App;
