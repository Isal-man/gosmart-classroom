import { Avatar, Typography } from "@mui/material";
import { AiOutlineClose, AiOutlineFile } from "react-icons/ai";
import { BiImageAlt, BiVideo } from "react-icons/bi";

export const AttachmentCard = ({ fileName, type, size }) => {
  return (
    <div className="card box-shadow flex justify-center items-center gap-2 p-4 w-full">
        <Avatar>
          {type.includes("image") ? (
            <BiImageAlt />
          ) : type.includes("video") ? (
            <BiVideo />
          ) : (
            <AiOutlineFile />
          )}
        </Avatar>
      <div className={"flex flex-col justify-center items-start w-1/2"}>
        <Typography noWrap className="w-11/12">
          {fileName}
        </Typography>
        <p className="text-xs">
          {Math.round(size / 1024 /1024).toLocaleString()} MB ({type})
        </p>
      </div>
      <Avatar>
        <AiOutlineClose />
      </Avatar>
    </div>
  );
};