import "./App.css";
import Drinks from "./components/Drinks";
import Drink_Detail from "./components/Drink_Detail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Drinks />} />
      <Route path="/drinkdetail/:id" element={<Drink_Detail/>} />
    </Routes>
  );
}

export default App;
