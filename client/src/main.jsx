import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primeicons/primeicons.css";
import { App } from "./App";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import {
  Calendar,
  ClassJoinPage,
  ClassPage,
  Home,
  ListTaskPage,
  LoginPage,
  RegisterPage,
  UserPage,
} from "./pages";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/course/:cid" element={<ClassPage />} />
          <Route path="/course/:cid/join-course" element={<ClassJoinPage />} />
          <Route path="/task/:cid" element={<ListTaskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
