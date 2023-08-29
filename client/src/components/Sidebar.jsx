import { NavLink } from "react-router-dom";

// icons
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { useContext } from "react";

// context
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext, SidebarContext } from "../App";
import { api } from "../services/ApiService";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  // common variable
  const user = JSON.parse(localStorage.getItem("user"));

  // context
  const { sidebarStyle, setSidebarStyle, block, setBlock } =
    useContext(SidebarContext);
  const { token } = useContext(AuthContext);

  // hooks
  const [courseTeacher, setCourseTeacher] = useState([]);
  const [courseStudent, setCourseStudent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const getTeacherCourses = await api.get(
        "api/v1/courses/s/teacher?email=" + user?.email,
        token
      );
      const teacherCourses = await getTeacherCourses.json();
      setCourseTeacher(teacherCourses);

      const getStudentCourses = await api.get(
        "api/v1/courses/s/student?email=" + user?.email,
        token
      );
      const studentCourses = await getStudentCourses.json();
      setCourseStudent(studentCourses);
    };

    load();
  }, [token]);

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
      className={`${block} fixed top-0 left-0 w-screen h-screen z-40`}
      onClick={handleSidebarStyle}
    >
      <aside
        className={`${sidebarStyle} hidden flex-col gap-2 py-1 bg-white w-10/12 sm:w-1/2 lg:w-1/3 xl:w-1/4 h-full overflow-y-auto`}
      >
        <section className={sectionStyle}>
          <NavLink
          to={"/user"}
            className={({ isActive }) =>
              isActive
                ? navStyle + " bg-blue-100 border border-blue-500"
                : navStyle
            }
          >
            <img src={user?.image} className={iconNavStyle} />
            <section className="flex flex-col items-start">
              <p>{user?.fullName}</p>
              <p className={secondTextStyle}>{user?.email}</p>
            </section>
          </NavLink>
        </section>
        <section className={sectionStyle}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? navStyle + " bg-blue-50 border border-blue-500"
                : navStyle
            }
          >
            <div className={iconNavStyle}>
              <AiOutlineHome />
            </div>
            <p>Beranda</p>
          </NavLink>
          <NavLink
            to={"/calendar"}
            className={({ isActive }) =>
              isActive
                ? navStyle + " bg-blue-50 border border-blue-500"
                : navStyle
            }
          >
            <div className={iconNavStyle}>
              <AiTwotoneCalendar />
            </div>
            <p>Kalender</p>
          </NavLink>
        </section>
        {courseTeacher.length > 0 && (
            <section className={sectionStyle}>
              <p className="p-2">Mengajar</p>
              {courseTeacher.map((k) => (
                <NavLink
                  key={k?.id}
                  className={({ isActive }) =>
                    isActive
                      ? navStyle + " bg-blue-50 border border-blue-500"
                      : navStyle
                  }
                  to={"/course/" + k?.id}
                >
                  <div className={iconNavStyle + ` ${k?.theme} text-white`}>
                    {k?.name.charAt(0)}
                  </div>
                  <section>
                    <p>{k?.name}</p>
                    <p className={secondTextStyle}>{k?.schedule}</p>
                  </section>
                </NavLink>
              ))}
            </section>
          )}
        {courseStudent.length > 0 && (
            <section className={sectionStyle}>
              <p className="p-2">Terdaftar</p>
              {courseStudent.map((k) => (
                <NavLink
                  key={k?.id}
                  className={({ isActive }) =>
                    isActive
                      ? navStyle + " bg-blue-50 border border-blue-500"
                      : navStyle
                  }
                  to={"/course/" + k?.id}
                >
                  <div className={iconNavStyle + ` ${k?.theme} text-white`}>
                    {k?.name.charAt(0)}
                  </div>
                  <section>
                    <p>{k?.name}</p>
                    <p className={secondTextStyle}>{k?.schedule}</p>
                  </section>
                </NavLink>
              ))}
            </section>
          )}
        <section className={sectionStyle}>
          <section className={navStyle}>
            <div className={iconNavStyle}>
              <BiArchiveIn />
            </div>
            <p>Kelas yang diarsipkan</p>
          </section>
        </section>
      </aside>
    </div>
  );
};
