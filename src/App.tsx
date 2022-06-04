import Home from "./components/Home";
import Characters from "./components/Characters";
import Locations from "./components/Locations";
import Episodes from "./components/Episodes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="characters" element={<Characters />} />
        <Route path="locations" element={<Locations />} />
        <Route path="episodes" element={<Episodes />} />
      </Routes>
    </BrowserRouter>
  );
};
