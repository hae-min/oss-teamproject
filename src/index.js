import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // App.js를 불러옴

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> {/* 이 부분이 실제로 화면에 렌더링됨 */}
  </React.StrictMode>
);
