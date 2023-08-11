import { Button } from "primereact/button";
import { useEffect } from "react";
import { useState } from "react";

export const ClassCard = ({gambar, nama, jadwal, guruId}) => {

  // state
  const [guru, setGuru] = useState({});

  useEffect(() => {
    const load = async () => {
      const response = await fetch("http://localhost:7060/api/v1/guru");
      const result = await response.json();
      setGuru(result)
    }

    load();
  }, [])

  // style
  const BackgroundStyle = {
    backgroundImage: `url(${gambar})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  };
  return (
    <div className="card box-shadow flex flex-col w-5/6 md:w-[45%] lg:w-[30%] xl:w-[22%]">
      <section
        className="flex flex-col gap-4 p-4 text-white text-shadow font-bold h-32 border-b border-b-slate-500"
        style={BackgroundStyle}
      >
        <section>
          <p className="text-xl">{nama}</p>
          <p className="text-sm">{jadwal}</p>
        </section>
        <section>
          <p className="text-base">{guru?.nama}</p>
        </section>
      </section>
      <section className="p-2 h-32">
        <img
          src="/837ff7c1-c5cc-4cab-b6a9-fcb19c88dd2f.jpg"
          className="float-right w-[74px] h-[74px] -mt-12 rounded-full"
        />
      </section>
      <section className="flex justify-end gap-2 p-2 border-t border-t-slate-400 w-full h-1/4">
        <Button icon="pi pi-book" rounded text severity="secondary" placeholder="Right" tooltip="list tugas" tooltipOptions={{ position: 'mouse' }} />
        <Button icon="pi pi-folder" rounded text severity="secondary" placeholder="Right" tooltip="folder kelas" tooltipOptions={{ position: 'mouse' }} />
      </section>
    </div>
  );
};