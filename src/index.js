import React from "react";
import ReactDOM from "react-dom/client";

import { MainLayout } from "./components/MainLayout";
import { TreeContainer } from "./pages/Tree/containers/TreeContainer";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MainLayout>
      <TreeContainer />
    </MainLayout>
  </React.StrictMode>
);