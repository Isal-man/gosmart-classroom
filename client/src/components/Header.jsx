import { useContext } from "react";

// icons
import { AiOutlinePlus } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

// context
import { useState } from "react";
import { SidebarContext } from "../App";

export const Header = () => {
  // context
  const { setSidebarStyle, setBlock } = useContext(SidebarContext);

  // state
  const [sectionClassStyle, setSectionClassStyle] = useState("");
  const [showSectionClass, setShowSectionClass] = useState(false);

  // style
  const buttonStyle =
    "flex justify-center items-center rounded-full text-lg md:text-4xl bg-transparent hover:bg-slate-200 w-8 h-8 md:w-10 md:h-10";
  const btnStyle = "w-full bg-transparent hover:bg-slate-300";

  // handle
  const handleSidebarStyle = () => {
    setBlock("block");
    setTimeout(() => {
      setSidebarStyle("slide-in");
    }, 100);
  };

  const handleSectionClassStyle = () => {
    if (showSectionClass) {
      setSectionClassStyle("pop-down");
      setTimeout(() => {
        setShowSectionClass(false);
        setSectionClassStyle("");
      }, 500);
    } else {
      setShowSectionClass(true);
      setTimeout(() => {
        setSectionClassStyle("pop-up");
      }, 100);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center gap-2 p-2 border-b border-b-slate-400">
        <section className="flex items-center lg:gap-4">
          <button className={buttonStyle} onClick={handleSidebarStyle}>
            <FiMenu />
          </button>
          <section>
            <img
              src="/logo-with-no-color.png"
              className="w-3/5 md:w-1/3 h-full md:h-4/5 lg:w-1/5"
            />
            <p>Gosmart Classroom</p>
          </section>
        </section>
        <section>
          <button className={buttonStyle} onClick={handleSectionClassStyle}>
            <AiOutlinePlus />
          </button>
        </section>
      </header>
      {showSectionClass && (
        <div
          className={`fixed top-0 left-0 w-screen h-screen`}
          onClick={handleSectionClassStyle}
        >
          <section
            className={`card ${sectionClassStyle} hidden absolute top-16 right-2 lg:right-8 xl:right-12 flex-col justify-center gap-2 bg-slate-100 box-shadow w-40 h-32`}
          >
            <button className={btnStyle}>Gabung kelas</button>
            <button className={btnStyle}>Buat kelas</button>
          </section>
        </div>
      )}
    </>
  );
};
