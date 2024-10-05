import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import ParkDetails from "./Pages/ParkDetails";
import Search from "./Pages/Search";
import Home from "./Pages/Home";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/park/:id" element={<ParkDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
