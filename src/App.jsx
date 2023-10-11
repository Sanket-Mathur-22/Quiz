import "./App.css";
import Play from "./components/play";
import SelectCategory from "./components/selectCategory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SelectCategory />} />
          <Route exact path="/play/:id" element={<Play />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
