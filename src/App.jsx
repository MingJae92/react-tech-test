import "./App.css";
import Drinks from "./components/Drinks";
import Drink_Details from "./components/Drink_Detail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Drinks />} />
       
      </Routes>
    
    
  );
}

export default App;


{/* <Router>
      <Routes>
        <Route path="/" element={<Drinks />} />
       
      </Routes>
    </Router> */}
