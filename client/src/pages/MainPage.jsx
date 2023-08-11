import { useState } from "react";
import { createContext } from "react";

// components
import { Header, Sidebar } from "../components";
import { Home } from "./Home";

export const SidebarContext = createContext();

export const MainPage = () => {
  const [sidebarStyle, setSidebarStyle] = useState("");
  const [block, setBlock] = useState("hidden");

  return (
    <SidebarContext.Provider value={{ sidebarStyle, setSidebarStyle, block, setBlock }}>
      <Header />
      <Sidebar />
      <main className="flex flex-col p-2 justify-center w-full h-full">
        <Home />
      </main>
    </SidebarContext.Provider>
  );
};
