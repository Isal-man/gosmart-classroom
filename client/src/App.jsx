import { useState } from "react";
import { createContext } from "react";
import { Header, Sidebar } from "./components";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ClassPage } from "./pages";

export const SidebarContext = createContext();
export const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

export const App = () => {
  // hooks
  const [sidebarStyle, setSidebarStyle] = useState("");
  const [block, setBlock] = useState("hidden");
  const [token, setToken] = useState();
  const url = useLocation();

  // variable
  const path = url.pathname.includes("login") || url.pathname.includes("register") || url.pathname.includes("forgot-password") || url.pathname.includes("join-course") || url.pathname.includes("oauth")

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <SidebarContext.Provider
        value={{
          sidebarStyle,
          setSidebarStyle,
          block,
          setBlock,
        }}
      >
        {!path ? (
          <>
            <Header />
            <Sidebar />
            <main className="flex flex-col justify-center p-2 w-full h-full">
              <Outlet />
              {/* <ClassPage /> */}
            </main>
          </>
        ) : (
          <Outlet />
        )}
      </SidebarContext.Provider>
    </AuthContext.Provider>
  );
};
