import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />

      </Routes>
    </Router>
  );
}

export default App;