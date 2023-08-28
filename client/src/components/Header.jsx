import { useContext } from "react";

// icons
import {
  AiFillCloseCircle,
  AiOutlineClose,
  AiOutlinePlus,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

// context
import { useState } from "react";
import { AuthContext, SidebarContext } from "../App";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../services/ApiService";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  // context
  const { setSidebarStyle, setBlock } = useContext(SidebarContext);
  const { token } = useContext(AuthContext);

  // hooks
  const [sectionClassStyle, setSectionClassStyle] = useState("");
  const [courseCode, setCourseCode] = useState();
  const [showSectionClass, setShowSectionClass] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // variable
  const user = JSON.parse(localStorage.getItem("user"));

  // style
  const buttonStyle =
    "flex justify-center items-center rounded-full text-lg md:text-4xl bg-transparent hover:bg-slate-200 w-8 h-8 md:w-10 md:h-10";
  const btnStyle = "w-full bg-transparent hover:bg-slate-200";

  // handle
  const handleSidebarStyle = () => {
    setBlock("block");
    setTimeout(() => {
      setSidebarStyle("slide-in");
    }, 100);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSectionClassStyle = () => {
    if (showSectionClass) {
      setSectionClassStyle("pop-down");
      setTimeout(() => {
        setShowSectionClass(false);
        setSectionClassStyle("");
      }, 300);
    } else {
      setShowSectionClass(true);
      setTimeout(() => {
        setSectionClassStyle("pop-up");
      }, 100);
    }
  };

  const handleJoin = async () => {
    const requestJoin = await api.get(
      "api/v1/courses/join-course?cc=" + courseCode + "&email=" + user?.email,
      token
    );
    const result = await requestJoin.text();
    window.location.href = result
  };

  return (
    <>
      <header className="flex justify-between items-center gap-2 p-2 border-b border-b-slate-400">
        <section className="flex items-center lg:gap-4">
          <button className={buttonStyle} onClick={handleSidebarStyle}>
            <FiMenu />
          </button>
          <section className={"flex gap-2 items-center"}>
            <img
              src="/logo-with-no-color.png"
              className="object-contain w-1/6 h-1/6 sm:w-1/12 lg:w-[5%]"
            />
            <Link
              to={"/"}
              className="text-md sm:text-2xl font-bold hover:text-blue-500"
            >
              Gosmart Classroom
            </Link>
          </section>
        </section>
        <section>
          <button className={buttonStyle} onClick={handleSectionClassStyle}>
            <AiOutlinePlus />
          </button>
        </section>
      </header>
      {showSectionClass && (
        <div
          className={`fixed top-0 left-0 w-screen h-screen`}
          onClick={handleSectionClassStyle}
        >
          <section
            className={`card ${sectionClassStyle} hidden absolute top-16 right-2 lg:right-8 xl:right-12 flex-col justify-center gap-2 bg-slate-100 box-shadow w-40 h-32`}
          >
            <button className={btnStyle} onClick={handleOpen}>
              Gabung kelas
            </button>
            <button className={btnStyle}>Buat kelas</button>
          </section>
        </div>
      )}
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
          <div className="flex flex-col justify-center items-center gap-4 p-4">
            {/* User card */}
            <div className="card box-shadow flex flex-col justify-center items-start gap-2 p-4 w-full lg:w-3/5 xl:w-1/2 bg-white rounded-md">
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
            <div className="card box-shadow flex flex-col items-start gap-4 p-4 w-full lg:w-3/5 xl:w-1/2 bg-white rounded-md mt-4">
              <Typography variant="h6" component="h3">
                Kode Kursus
              </Typography>
              <Typography variant="body1" className="mt-2">
                Masukkan kode yang Anda dapat di sini.
              </Typography>
              <TextField
                variant="outlined"
                className="mt-3 w-full sm:w-1/2"
                label="Course Code"
                size="small"
                onChange={(e) => setCourseCode(e.target.value)}
              />
              <button
                className={"text-white bg-blue-500 w-full sm:w-1/2"}
                onClick={handleJoin}
              >
                Gabung
              </button>
            </div>
            <div className={"flex flex-col items-start w-full lg:w-3/5 xl:w-1/2"}>
              {/* Information */}
              <p className={"font-semibold"}>
                Untuk join menggunakan kode kursus
              </p>
              <ul>
                <li className={"text-sm"}>
                  Gunakan akun yang sudah terverifikasi
                </li>
                <li className={"text-sm"}>
                  Gunakan kode kursus yang terdiri dari 9 karakter kombinasi
                  huruf dan angka, tanpa spasi ataupun simbol
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbarOpen(false)}
        message={"Kamu sudah join"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};
