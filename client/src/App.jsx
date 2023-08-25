import { useState } from "react";
import { createContext } from "react";
import { Header, Sidebar } from "./components";
import { Home, LoginPage } from "./pages";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const SidebarContext = createContext();

export const App = () => {
  const [sidebarStyle, setSidebarStyle] = useState("");
  const [block, setBlock] = useState("hidden");
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  return (
    // <SidebarContext.Provider
    //   value={{ sidebarStyle, setSidebarStyle, block, setBlock }}
    // >
    //   {token && (
    //     <>
    //       <Header />
    //       <Sidebar user={user} token={token} />
    //       <main className="flex flex-col justify-center p-2 w-full h-full">
    //         <Outlet context={{ user, setUser, token, setToken }} />
    //       </main>
    //     </>
    //   )}
    //   <Outlet context={{ user, setUser, token, setToken }} />
    // </SidebarContext.Provider>
    <LoginPage />
  );
};
