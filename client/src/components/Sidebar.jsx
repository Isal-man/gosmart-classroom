import { NavLink } from "react-router-dom";

// icons
import {
  AiFillCopyrightCircle,
  AiOutlineHome,
  AiOutlineSetting,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { useContext } from "react";

// context
import { SidebarContext } from "../pages/MainPage";
import { useEffect } from "react";
import { useState } from "react";
import { APP_BASE_URL } from "../config/constant";

export const Sidebar = () => {
  // context
  const { sidebarStyle, setSidebarStyle, block, setBlock } =
    useContext(SidebarContext);

  // state
  const [akun, setAkun] = useState([]);
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    const loadAkun = async () => {
      const response = await fetch(APP_BASE_URL + "/akun");
      const result = await response.json();
      setAkun(result);
    };

    const loadKelas = async () => {
      const response = await fetch(APP_BASE_URL + "/kelas");
      const result = await response.json();
      setKelas(result);
    };

    loadAkun();
    loadKelas();
  }, []);

  // style
  const sectionStyle =
    "flex flex-col gap-2 justify-center items-start py-2 text-gray-600 border-b border-b-slate-400";
  const navStyle =
    "flex items-center gap-4 p-2 w-full h-14 rounded-none rounded-tr-full rounded-br-full";
  const iconNavStyle =
    "flex justify-center items-center text-2xl w-10 xl:w-[12%] h-10 rounded-full";
  const secondTextStyle = "text-sm";

  // handle
  const handleSidebarStyle = () => {
    setSidebarStyle("slide-out");
    setTimeout(() => {
      setBlock("hidden");
      setSidebarStyle("");
    }, 500);
  };

  return (
    <div
      className={`${block} fixed top-0 left-0 w-screen h-screen`}
      onClick={handleSidebarStyle}
    >
      <aside
        className={`${sidebarStyle} hidden flex-col gap-2 py-1 bg-slate-100 w-10/12 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full overflow-y-auto`}
      >
        <section className={sectionStyle}>
          <button className="flex items-center gap-4 w-full h-16 bg-slate-200 rounded-none rounded-tr-full rounded-br-full border border-blue-400">
            <img src={akun[0]?.gambar} className={iconNavStyle} />
            <section className="flex flex-col items-start">
              <p>{akun[0]?.username}</p>
              <p className={secondTextStyle}>{akun[0]?.email}</p>
            </section>
          </button>
        </section>
        <section className={sectionStyle}>
          <a className={navStyle}>
            <div className={iconNavStyle}>
              <AiOutlineHome />
            </div>
            <p>Beranda</p>
          </a>
          <a className={navStyle}>
            <div className={iconNavStyle}>
              <AiTwotoneCalendar />
            </div>
            <p>Kalender</p>
          </a>
        </section>
        <section className={sectionStyle}>
          <p className="p-2">Mengajar</p>
          {kelas.map((k) => (
            <section key={k?.id} className={navStyle}>
              <div className={iconNavStyle + ` ${k?.temaKelas} text-white`}>{k?.nama.charAt(0)}</div>
              <section>
                <p>{k?.nama}</p>
                <p className={secondTextStyle}>{k?.jadwal}</p>
              </section>
            </section>
          ))}
        </section>
        <section className={sectionStyle}>
          <p className="p-2">Terdaftar</p>
          {kelas.map((k) => (
            <section key={k?.id} className={navStyle}>
              <div className={iconNavStyle + ` ${k?.temaKelas} text-white`}>{k?.nama.charAt(0)}</div>
              <section>
                <p>{k?.nama}</p>
                <p className={secondTextStyle}>{k?.jadwal}</p>
              </section>
            </section>
          ))}
        </section>
        <section className={sectionStyle}>
          <section className={navStyle}>
            <div className={iconNavStyle}>
              <BiArchiveIn />
            </div>
            <p>Kelas yang diarsipkan</p>
          </section>
          <section className={navStyle}>
            <div className={iconNavStyle}>
              <AiOutlineSetting />
            </div>
            <p>Setelan</p>
          </section>
        </section>
      </aside>
    </div>
  );
};
