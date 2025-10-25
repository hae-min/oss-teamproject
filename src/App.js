import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import Join from "./Join";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;