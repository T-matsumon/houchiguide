import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // 1. これを追加
import App from "./App";
import "./index.css";

// 2. <App /> を <HashRouter> で囲む
createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
