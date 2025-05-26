import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/styles/reusable-styles.css";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:character" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
