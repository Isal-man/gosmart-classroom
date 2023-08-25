import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primeicons/primeicons.css";
import { App } from "./App";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import { createBrowserRouter } from "react-router-dom";
import { Home, LoginPage } from "./pages";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
