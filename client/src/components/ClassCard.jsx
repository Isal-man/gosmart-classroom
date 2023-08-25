import { useEffect } from "react";
import { useState } from "react";

// icons
import { Button } from "primereact/button";
import { BiFolder, BiTask } from "react-icons/bi";

export const ClassCard = ({ id, name, schedule, image, theme, users }) => {
  // basic variable
  const url = image || "https://firebasestorage.googleapis.com/v0/b/gosmart-classroom.appspot.com/o/logo-with-color.jpg?alt=media&token=0abf7ac1-ba7c-4cfd-992c-b8deb13fdf84";
  
  // state
  const [teacher, setTeacher] = useState(users);

  // useEffect(() => {
  //   const load = async () => {
  //     const response = await fetch(APP_BASE_URL + "/guru");
  //     const result = await response.json();
  //     setGuru(result);
  //   };

  //   load();
  // }, []);

  // style
  const BackgroundStyle = {
    backgroundImage: `url(${url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  };
  const buttonStyle = "text-2xl rounded-full bg-transparent hover:bg-slate-200 w-10 h-1/6 tooltip"

  return (
    <div className="card box-shadow flex flex-col w-5/6 md:w-[45%] lg:w-[30%] xl:w-[22%]">
      <section
        className="flex flex-col gap-4 p-4 text-white text-shadow font-bold h-32 border-b border-b-slate-500"
        style={BackgroundStyle}
      >
        <section>
          <p className="text-xl">{name}</p>
          <p className="text-sm">{schedule}</p>
        </section>
        <section>
          <p className="text-base">{teacher?.name}</p>
        </section>
      </section>
      <section className="p-2 h-32">
        <img
          src="/837ff7c1-c5cc-4cab-b6a9-fcb19c88dd2f.jpg"
          className="float-right w-[74px] h-[74px] -mt-12 rounded-full"
        />
      </section>
      <section className="flex justify-end gap-2 p-2 border-t border-t-slate-400 w-full h-1/4">
        <button className={buttonStyle}>
          <BiTask />
          <span className="tooltiptext">
            list tugas
          </span>
        </button>
        <button className={buttonStyle}>
          <BiFolder />
          <span className="tooltiptext">
            folder kelas
          </span>
        </button>
      </section>
    </div>
  );
};
