import React from "react";
import Main from "./pages/main";
import { createRoot } from "react-dom/client";

import "./static/css/static.css";
import "antd/dist/antd.min.css";
const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(<Main />);
