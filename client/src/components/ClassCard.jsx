import { useState } from "react";

// icons
import { BiFolder, BiTask } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const ClassCard = ({ id, name, schedule, image, users }) => {
  // basic variable
  const url = image || "https://storage.googleapis.com/gosmart-classroom.appspot.com/logo-with-color.jpg";
  const teacher = users;

  // hooks
  const navigate = useNavigate()

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
    <div className="card box-shadow flex flex-col w-5/6 sm:w-[30%] lg:w-64 xl:w-80 h-full sm:h-64 xl:h-full" onClick={() => navigate("/course/" + id)}>
      <section
        className="flex flex-col gap-4 p-4 text-white text-shadow font-bold h-32 border-b border-b-slate-500"
        style={BackgroundStyle}
      >
        <section>
          <p className="text-xl">{name}</p>
          <p className="text-sm">{schedule}</p>
        </section>
        <section>
          <p className="text-xs w-1/2">{teacher?.fullName}</p>
        </section>
      </section>
      <section className="p-2 h-32">
        <img
          src={teacher.image}
          className="float-right w-[74px] h-[74px] -mt-12 rounded-full object-cover"
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
