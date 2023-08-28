import { BiTask } from "react-icons/bi";
import { ShortenText } from "./ShortenedText";

export const TaskCard = ({ name, dueDate }) => {
  const date = new Date(dueDate);

  return (
    <div className={
      "card box-shadow flex justify-start items-center gap-4 p-4 bg-white w-full h-full"
    }>
      <div
        className={
          "flex justify-center items-center p-3 rounded-full text-2xl text-white bg-red-500"
        }
      >
        <BiTask />
      </div>
      <div>
        <p className={"text-sm font-medium"}>
          <ShortenText
            text={name}
            maxLength={30}
          />
        </p>
        <div className={"text-xs"}>
          {date.toLocaleString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
