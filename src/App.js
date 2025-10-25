import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/profile" element={<Home />} />//루트 확인할때 profile을 home으로 하기, push나 pull할때는 다시 변경!!!!

      </Routes>
    </Router>
  );
}

export default App;