import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Join";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;