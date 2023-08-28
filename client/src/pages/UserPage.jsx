import { TextField } from "@mui/material";
import { ProtectedRoute } from "../components";
import { useState } from "react";
import axios from "axios";
import { APP_BACKEND } from "../config/constant";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { api } from "../services/ApiService";
import { useContext } from "react";
import { AuthContext } from "../App";
import { useEffect } from "react";

export const UserPage = () => {
  // variable
  const user = JSON.parse(localStorage.getItem("user"));

  // state
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [editUser, setEditUser] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    image: user?.image,
  });
  const navigate = useNavigate();

  // context
  const { token } = useContext(AuthContext)

  useEffect(() => {
    console.log(token);
  }, [token])

  // handle
  const handleUpload = async (e) => {
    try {
      const imageBlob = URL.createObjectURL(e.target.files[0]);
      setImageUrl(imageBlob);

      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      console.log("FormData:", formData); // Check if formData contains the file

      const upload = await axios.post(
        "http://localhost:7060/api/v1/upload",
        formData
      );

      const result = await upload.data;
      setEditUser({ ...editUser, image: result.url });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = (isEditing) => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      fetch(APP_BACKEND + "auth/logout", {
        credentials: "include",
      });
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const handleEdit = (isEditing) => {
    if (isEditing) {
      handleSubmit();
    } else {
      setIsEditing(true);
    }
  };

  const handleSubmit = async () => {
    const edit = await api.put("api/v1/users?email=" + user?.email, token, editUser)
    const result = await edit.json();
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(result))
    window.location.reload();
  };

  return (
    <ProtectedRoute>
      <div
        className={
          "flex flex-col justify-center items-center gap-8 p-4 w-full h-full"
        }
      >
        <div
          className={"flex justify-center items-end w-1/2 h-1/2"}
          htmlFor="file"
        >
          <img
            src={imageUrl || user?.image}
            className={"object-cover rounded-full w-32 h-32 sm:w-40 sm:h-40"}
          />
          {isEditing && (
            <label
              className={
                "flex justify-center items-center p-2 rounded-full border border-black hover:cursor-pointer"
              }
              htmlFor="file"
            >
              <BiPencil />
            </label>
          )}
        </div>
        {isEditing && (
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        )}
        <div
          className={
            "card box-shadow flex flex-col justify-center items-start gap-4 p-4 w-full sm:w-2/3 lg:w-1/2 h-full"
          }
        >
          {[
            [
              "Full Name",
              user?.fullName,
              "Nama harus memiliki setidaknya 3 karakter, dan maksimal 50 karakter",
            ],
            ["Email", user?.email, "Masukan email dengan format yang sesuai"],
            [
              "Phone Number",
              user?.phoneNumber,
              "Awali nomor telepon dengan +62 dengan minimal 12 karakter dan maksimal 14 karakter",
            ],
          ].map(([title, value, info], i) => (
            <label
              key={i}
              className={"flex flex-col justify-center items-start"}
            >
              {title}
              <TextField
                variant="standard"
                fullWidth
                value={value}
                disabled={!isEditing}
              />
              {isEditing && (
                <span className="text-xs text-gray-400">{info}</span>
              )}
            </label>
          ))}
        </div>
        <div
          className={
            "flex justify-between items-center p-2 w-full sm:w-2/3 lg:w-1/2"
          }
        >
          <button
            className={"bg-blue-500 text-white"}
            onClick={() => handleEdit(isEditing)}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button className={"bg-red-500 text-white"} onClick={() => handleCancel(isEditing)}>
            {isEditing ? "Cancel" : "Log Out"}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};
