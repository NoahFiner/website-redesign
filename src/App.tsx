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

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
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
  return (
    <ContentPage
      titleTexture={itmeHeader}
      titleFragUniforms={{
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
  return (
    <ContentPage
      titleTexture={projectsHeader}
      titleFragUniforms={{
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
  return (
    <ContentPage
      titleTexture={photosHeader}
      titleFragUniforms={{
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
    <ContentPage>
      <h2>not found</h2>
    </ContentPage>
  );
}

export default App;
