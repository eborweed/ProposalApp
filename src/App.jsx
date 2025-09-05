import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import YesPage from "./components/YesPage";
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/yes" element={<YesPage />} />
      </Routes>
    </Router>
  );
}

export default App;