import { Avatar, Typography } from "@mui/material";
import { AiOutlineClose, AiOutlineFile } from "react-icons/ai";
import { BiImageAlt, BiVideo } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export const AttachmentViewCard = ({ name, type, size, url }) => {
  return (
    <NavLink to={url} className="card box-shadow flex justify-start items-center gap-2 p-4 w-full">
        <Avatar>
          {type.includes("image") ? (
            <BiImageAlt />
          ) : type.includes("video") ? (
            <BiVideo />
          ) : (
            <AiOutlineFile />
          )}
        </Avatar>
      <div className={"flex flex-col justify-center items-start w-full"}>
        <Typography noWrap className="w-5/6">
          {name}
        </Typography>
        <p className="text-xs">
          {Math.round(size / 1024 /1024).toLocaleString()} MB ({type})
        </p>
      </div>
    </NavLink>
  );
};
