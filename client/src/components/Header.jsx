import { useContext } from "react";

// icons
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { BsFillMoonStarsFill, BsFillPlusCircleFill, BsGlobe, BsPlusCircle } from "react-icons/bs";

// context
import { useState } from "react";
import { AuthContext, SidebarContext } from "../App";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../services/ApiService";
import { useEffect } from "react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

export const Header = () => {
  // context
  const { setSidebarStyle, setBlock } = useContext(SidebarContext);
  const { token } = useContext(AuthContext);

  // variable
  const user = JSON.parse(localStorage.getItem("user"));

  // hooks
  const [sectionClassStyle, setSectionClassStyle] = useState("");
  const [courseCode, setCourseCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [onUpload, setOnUpload] = useState(false);
  const [showSectionClass, setShowSectionClass] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    schedule: "",
    image: "",
    theme: "",
    email: user?.email,
  });
  const [image, setImage] = useState();
  const [background, setBackground] = useState("");
  const [open, setOpen] = useState(false);
  const [isJoin, setIsjoin] = useState();

  useEffect(() => {}, [token]);

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

  const handleOpen = (isJoin) => {
    setOpen(true);
    if (isJoin) {
      setIsjoin(true);
    } else {
      setIsjoin(false);
    }
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
    setIsLoading(true);
    const requestJoin = await api.get(
      "api/v1/courses/join-course?cc=" + courseCode + "&email=" + user?.email,
      token
    );
    const result = await requestJoin.text();
    setIsLoading(false);
    window.location.href = result;
  };

  const handleUpload = async (e) => {
    try {
      setOnUpload(true);
      setIsLoading(true);
      const imageBlob = URL.createObjectURL(e.target.files[0]);
      setImage(imageBlob);

      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const upload = await axios.post(
        "http://localhost:7060/api/v1/upload",
        formData
      );

      const result = await upload.data;
      setNewCourse({ ...newCourse, image: result.url });
      setIsLoading(false);
      setOnUpload(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    const request = await api.post("api/v1/courses", token, newCourse);

    if (request.status !== 200) {
      alert("Kursus gagal dibuat");
    }
    
    setIsLoading(false)
    history.go("/");
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
        <section className={"flex justify-center items-center gap-4"}>
          <button className={buttonStyle} onClick={handleSectionClassStyle}>
            <BsPlusCircle />
          </button>
          <button className={buttonStyle} onClick={handleSectionClassStyle}>
            <BsGlobe />
          </button>
          <button className={buttonStyle} onClick={handleSectionClassStyle}>
            <BsFillMoonStarsFill />
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
            <button className={btnStyle} onClick={() => handleOpen(true)}>
              Gabung kelas
            </button>
            <button className={btnStyle} onClick={() => handleOpen(false)}>
              Buat kelas
            </button>
          </section>
        </div>
      )}
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogContent>
          <div className="flex justify-between items-center text-center w-full mb-10">
            <p className={"text-2xl"}>
              {isJoin ? "Gabung kursus" : "Buat Kelas"}
            </p>
            <button
              onClick={handleClose}
              className="bg-white flex sm:absolute right-10 justify-center items-center text-2xl w-10 rounded-full hover:bg-slate-200"
            >
              <AiOutlineClose />
            </button>
          </div>
          {isJoin ? (
            <div className="flex flex-col justify-center items-center gap-4 p-4">
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
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  loadingIndicator="Gabung..."
                  variant="contained"
                  className={"text-white bg-blue-500 w-full sm:w-1/2"}
                  onClick={handleJoin}
                >
                  <span>Gabung</span>
                </LoadingButton>
              </div>
              <div
                className={"flex flex-col items-start w-full lg:w-3/5 xl:w-1/2"}
              >
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
          ) : (
            <div className="flex flex-col justify-center items-center gap-4 p-4">
              <div className="card box-shadow flex flex-col justify-center items-center gap-2 p-4 w-full lg:w-3/5 xl:w-1/2 bg-white rounded-md">
                <div
                  className={
                    "card box-shadow flex flex-col justify-center items-center p-4 w-full"
                  }
                >
                  <label htmlFor="img">
                    <img
                      src={
                        image
                          ? image
                          : "https://storage.googleapis.com/gosmart-classroom.appspot.com/gallery.png"
                      }
                      className={"w-72 h-48 sm:h-72 rounded-lg"}
                    />
                  </label>
                  <p>{image ? "" : "Gambar belum diupload"}</p>
                  <input
                    type="file"
                    id="img"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />
                </div>
                <div
                  className={
                    "card box-shadow flex flex-wrap justify-center items-center gap-4 p-4 w-full"
                  }
                >
                  {[
                    ["bg-red-500", "red"],
                    ["bg-green-500", "green"],
                    ["bg-blue-500", "blue"],
                    ["bg-cyan-500", "cyan"],
                    ["bg-orange-500", "orange"],
                    ["bg-purple-500", "purple"],
                    ["bg-gray-500", "gray"],
                  ].map(([bg, theme], i) => (
                    <button
                      key={i}
                      className={
                        bg +
                        " flex justify-center items-center text-white text-xl rounded-full w-10 h-10"
                      }
                      onClick={() => {
                        setNewCourse({ ...newCourse, theme });
                        setBackground(bg);
                      }}
                    >
                      {background === bg ? <AiOutlineCheck /> : ""}
                    </button>
                  ))}
                </div>
              </div>
              <div className="card box-shadow flex flex-col justify-center items-center gap-4 p-4 w-full lg:w-3/5 xl:w-1/2 bg-white rounded-md">
                <p>Data kursus</p>
                <TextField
                  required
                  variant="filled"
                  label="Nama kursus"
                  className={"w-full sm:w-3/4"}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, name: e.target.value })
                  }
                />
                <TextField
                  required
                  variant="filled"
                  label="Jadwal"
                  className={"w-full sm:w-3/4"}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, schedule: e.target.value })
                  }
                />
              </div>
              <div className="card box-shadow flex flex-col items-center gap-4 p-4 bg-white rounded-md mt-4 w-full lg:w-3/5 xl:w-1/2">
                <p className="text-sm text-center">
                  Anda otomatis menjadi guru
                </p>
                {/* <button
                  className={"text-white bg-blue-500 w-full sm:w-3/4"}
                  onClick={handleSubmit}
                >
                  Buat kelas
                </button> */}
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  loadingIndicator={onUpload ? "Mengupload...": "Membuat..."}
                  variant="contained"
                  className={"text-white bg-blue-500 w-full sm:w-1/2"}
                  onClick={handleSubmit}
                >
                  <span>Buat kelas</span>
                </LoadingButton>
              </div>
            </div>
          )}
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
