import Home from "./components/Home";

import Characters from "./components/Characters";
import Locations from "./components/Locations";
import Episodes from "./components/Episodes";

import Character from "./components/Character";
import Location from "./components/Location";
import Episode from "./components/Episode";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="characters" element={<Characters />} />
        <Route path="locations" element={<Locations />} />
        <Route path="episodes" element={<Episodes />} />
        <Route path="character/:id" element={<Character />} />
        <Route path="location/:id" element={<Location />} />
        <Route path="episode/:id" element={<Episode />} />
      </Routes>
    </BrowserRouter>
  );
};
