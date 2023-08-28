import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Snackbar,
} from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { api } from "../services/ApiService";
import { ProtectedRoute } from "../components";

export const ClassJoinPage = () => {
  // variable
  const open = true;
  const user = JSON.parse(localStorage.getItem("user"));

  // context
  const { token } = useContext(AuthContext);

  // hooks
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { cid } = useParams();
  const query = useLocation();

  useEffect(() => {
    const load = async () => {
      const requestJoin = await api.get("api/v1/enrollments/sid/" + user?.email + "/cid/" + cid, token);
      const result = await requestJoin.text();
      if (result.match("enroll")) {
        window.location.href = "http://localhost:5173/course/" + cid;
      }
    };
    load();
    setIsLoading(false);
  }, [token]);

  // handle
  const handleClose = () => {
    navigate("/");
  };

  const handleJoin = async () => {
    const requestJoin = await api.get(
      "api/v1/courses/join-course?cc=" +
        query.search.substring(5) +
        "&email=" +
        user?.email,
      token
    );
    const result = await requestJoin.text();
    if (result.match("enroll")) {
      window.location.href = "http://localhost:5173/course/" + cid;
    }
    window.location.href = result;
  };

  return isLoading ? (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {/* Center LinearProgress */}
      <CircularProgress />
    </div>
  ) : (
    <ProtectedRoute>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogContent>
          <div className="flex justify-between items-center text-center w-full">
            <p className={"text-2xl"}>Gabung kursus</p>
            <button
              onClick={handleClose}
              className="bg flex justify-center items-center text-2xl w-1/5"
            >
              <AiOutlineClose />
            </button>
          </div>
          <div
            className={"flex flex-col justify-center items-center gap-4 p-4"}
          >
            <img
              src="https://storage.googleapis.com/gosmart-classroom.appspot.com/logo-with-no-color.png"
              className={"object-contain w-40 h-40"}
            />
            <p className={"text-3xl text-center font-semibold"}>
              Gosmart Classroom
            </p>
            <p className="text-xl text-center">Be smart, Be useful</p>
            <p className="text-center">
              Gosmart Classroom dibuat untuk dijadikan sarana belajar secara
              online, agar siapapun yang ingin mengembangkan pengetahuannya
              tidak akan terkendala waktu dan tempat, karena mereka dapat
              belajar dari mana saja.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 p-4">
            {/* User card */}
            <div className="card box-shadow flex flex-col justify-center items-start gap-2 p-4 bg-white rounded-md">
              <p>Anda login sebagai:</p>
              <div className={"flex justify-center items-start gap-2 p-2"}>
                {/* User image */}
                <img
                  src={user?.image}
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                {/* User info */}
                <div
                  className={
                    "flex flex-col justify-start text-sm w-full h-full"
                  }
                >
                  <p>{user?.fullName}</p>
                  <p>{user?.email}</p>
                </div>
                {/* Change account button */}
              </div>
              <Button
                variant="outlined"
                color="primary"
                className={"w-full"}
                onClick={() => navigate("/login")}
              >
                Change Account
              </Button>
            </div>
            {/* Course code card */}
            <div className="card box-shadow flex flex-col items-start gap-4 p-4 bg-white rounded-md mt-4">
              <p className="text-sm">Anda bergabung sebagai peserta</p>
              <button
                className={"text-white bg-blue-500 w-full"}
                onClick={handleJoin}
              >
                Gabung ke kursus
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ProtectedRoute>
  );
};
