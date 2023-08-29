import { BiSolidBookBookmark, BiTask } from "react-icons/bi";
import { MdAnnouncement } from "react-icons/md"
import { ShortenText } from "./ShortenedText";
import { useNavigate } from "react-router-dom";

export const AssignmentCard = ({
  id,
  name,
  isMaterial,
  isTask,
  isAnnouncement,
  postDate,
  users,
}) => {
  // variable
  const date = new Date(postDate);

  // hooks
  const navigate = useNavigate();

  return (
    <div
      className={
        "card box-shadow flex justify-start items-center gap-4 p-4 bg-white w-full h-full"
      }
      onClick={() => navigate("/assignment/" + id)}
    >
      <div
        className={
          "flex justify-center items-center p-3 rounded-full text-2xl text-white bg-red-500"
        }
      >
        {isMaterial ? <BiSolidBookBookmark /> : isTask ? <BiTask /> : isAnnouncement && <MdAnnouncement />}
      </div>
      <div>
        <p className={"text-sm font-medium"}>
          {users?.fullName + " Memposting: "}
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
