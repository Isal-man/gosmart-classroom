import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primeicons/primeicons.css";
import { App } from "./App";


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

import 'react-quill/dist/quill.snow.css';

import {
  AssignmentPage,
  Calendar,
  ClassJoinPage,
  ClassPage,
  Home,
  ListTaskPage,
  LoginPage,
  OAuthPage,
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
          <Route path="/oauth" element={<OAuthPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/course/:cid" element={<ClassPage />} />
          <Route path="/course/:cid/join-course" element={<ClassJoinPage />} />
          <Route path="/task/:cid" element={<ListTaskPage />} />
          <Route path="/course/:cid/assignment/:aid" element={<AssignmentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
