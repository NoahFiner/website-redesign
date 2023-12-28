import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContentPage } from "./ContentPage";
import Home from "./Home";
import AboutContent from "./About";
import projectsHeader from "./img/headers/projects.png";
import photosHeader from "./img/headers/photos.png";
import itmeHeader from "./img/headers/itme.png";

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
  return (
    <ContentPage
      titleFragUniforms={{
        texture0: itmeHeader,
        image_size_x: 993,
        image_size_y: 254,
      }}
    >
      <AboutContent />
    </ContentPage>
  );
}

function Projects() {
  return (
    <ContentPage
      titleFragUniforms={{
        texture0: projectsHeader,
        image_size_x: 1211,
        image_size_y: 296,
      }}
    >
      <p>Projects asdfasdf</p>
    </ContentPage>
  );
}

function Pics() {
  return (
    <ContentPage
      titleFragUniforms={{
        texture0: photosHeader,
        image_size_x: 1029,
        image_size_y: 242,
      }}
    >
      <p>Pics asdfasdf</p>
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
