import { useState } from "react";
import {
  AssignmentCard,
  AttachmentCard,
  EnrollmentCard,
  ProtectedRoute,
} from "../components";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import {
  BiClipboard,
  BiImageAlt,
  BiPencil,
  BiPlus,
  BiSolidShareAlt,
  BiVideo,
} from "react-icons/bi";
import { useEffect } from "react";
import { api } from "../services/ApiService";
import { useContext } from "react";
import { AuthContext } from "../App";
import { useParams } from "react-router-dom";
import { AiOutlineClose, AiOutlineFile } from "react-icons/ai";
import { LoadingButton } from "@mui/lab";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { APP_BACKEND, APP_FRONTEND } from "../config/constant";

export const ClassPage = () => {
  // variable
  const user = JSON.parse(localStorage.getItem("user"));
  const buttons = ["Forum", "Tugas", "Orang"];
  const postDate = new Date();
  const today = dayjs();

  // hooks
  const [isEnrolled, setIsEnrolled] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [onUpload, setOnUpload] = useState(false);
  const [onPosting, setOnPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [activeButton, setActiveButton] = useState(buttons[0]);
  const [course, setCourse] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [clipboardOpen, setClipboardOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [openAssignment, setOpenAssignment] = useState(false);
  const [assignmentType, setAssignmentType] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [assignment, setAssignment] = useState({
    name: "",
    description: "",
    postDate,
    dueDate: "",
    isMaterial: "",
    isTask: "",
    isAnnouncment: "",
  });
  const { cid } = useParams();
  const path = useLocation();

  const open = Boolean(anchorEl);
  const link =
    APP_FRONTEND + "/course/" + cid + "/join-course?cc=" + cid.substring(0, 8);

  // context
  const { token } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    localStorage.setItem("url", path.pathname + path.search);
    const load = async () => {
      const requestJoin = await api.get(
        "/api/v1/enrollments/sid/" + user?.email + "/cid/" + cid,
        token
      );
      const result = await requestJoin.text();
      setIsEnrolled(result);
      if (isEnrolled === "not enroll") {
        window.location.href = link;
      }
      const course = await api.get("/api/v1/courses/" + cid, token);
      const getCourse = await course.json();
      setCourse(getCourse);

      const assignments = await api.get(
        "/api/v1/assignments/cid/" + cid,
        token
      );
      const getAssignments = await assignments.json();
      setAssignments(getAssignments);

      const enrollments = await api.get(
        "/api/v1/enrollments/cid/" + cid,
        token
      );
      const getEnrollments = await enrollments.json();
      setEnrollments(getEnrollments);
    };
    load();
    setIsLoading(false);
  }, [token, cid, isEnrolled]);

  // handle
  const handleButtonClick = (buttonLabel) => {
    setActiveButton(buttonLabel);
  };

  const openClipboard = () => {
    setClipboardOpen(true);
  };

  const closeClipboard = () => {
    setClipboardOpen(false);
  };

  const openAssignmentDialog = (type) => {
    if (type === "material") {
      setAssignmentType("material");
      setAssignment({ ...assignment, isMaterial: true });
    } else if (type === "task") {
      setAssignmentType("task");
      setAssignment({ ...assignment, isTask: true });
    } else {
      setAssignmentType("announcement");
      setAssignment({ ...assignment, isAnnouncment: true });
    }
    setOpenAssignment(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAssignment = () => {
    setOpenAssignment(false);
    setAnchorEl(null);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    closeClipboard();
    setIsCopied(true);
  };

  const handleUpload = async () => {
    try {
      setOnUpload(true);

      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const upload = await axios.post(APP_BACKEND + "/api/v1/upload", formData);

      const result = await upload.data;
      setAttachments([...attachments, result]);
      setOnUpload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    setOnPosting(true);
    const postAssignment = await api.post(
      "/api/v1/assignments/" + course.id + "?type=" + assignmentType,
      token,
      assignment
    );
    const getAssignment = await postAssignment.json();
    attachments.length > 0 &&
      attachments.forEach(
        async (attach) =>
          await api.post(
            "/api/v1/attachments?user=" +
              user.email +
              "&assignment=" +
              getAssignment?.id +
              "&status=teacher",
            token,
            attach
          )
      );
    setOnPosting(false);
    setAttachments([]);
    handleCloseAssignment(true);
    setPosted(true);
    setAssignments([...assignments, getAssignment]);
    sendEmail(assignment.name);
  };

  const sendEmail = (name) => {
    enrollments.forEach((e) => {
      if (e?.users?.email !== user?.email && e?.users?.email) {
        let studentEmail = e?.users?.email;
        const emailRequest = {
          teacherName: course?.users?.fullName,
          studentEmail,
          assignmentName: name,
        };

        api.post("/api/v1/send-email", token, emailRequest);
      }
    });
  };

  // style
  const assignmentStyle =
    "flex flex-col justify-center items-center gap-4 w-full h-full";
  const peopleStyle = "w-full h-full";
  const statusStyle = "text-2xl font-semibold p-2 border-b-2 border-black";
  const buttonStyle =
    "text-2xl rounded-full bg-transparent hover:bg-slate-200 w-10 h-1/6 tooltip";

  return (
    <ProtectedRoute>
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <header
            className={
              "flex justify-center items-center gap-4 w-full border-b-2 border-slate-300"
            }
          >
            {buttons.map((button) => (
              <button
                key={button}
                onClick={() => handleButtonClick(button)}
                className={
                  activeButton === button
                    ? course?.theme +
                      " " +
                      course.theme +
                      "-text" +
                      " font-bold text-xs text-center bg border-b-4 rounded-bl rounded-br p-3 w-28 hover:no-underline"
                    : "bg text-xs text-black p-3 w-28"
                }
              >
                {button}
              </button>
            ))}
          </header>
          <main
            className={
              "flex flex-col justify-center items-center gap-4 w-full h-full"
            }
          >
            {activeButton === "Forum" && (
              <>
                <div
                  className={"card p-4 w-full h-full"}
                  style={{
                    backgroundImage: `url(${course?.image})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className={"flex justify-end w-full"}>
                    <button
                      className={
                        "box-shadow flex justify-center items-center gap-4 w-40 bg-white " +
                        course?.theme +
                        "-text"
                      }
                    >
                      <BiPencil size={18} />
                      Sesuaikan
                    </button>
                  </div>
                  <div
                    className={
                      "flex justify-between items-center text-shadow mt-24 sm:mt-32 lg:mt-40"
                    }
                  >
                    <div>
                      <p className={"text-3xl text-white font-bold"}>
                        {course?.name}
                      </p>
                      <p className={"text-white"}>{course?.schedule}</p>
                    </div>
                    <div>
                      <button className={buttonStyle} onClick={openClipboard}>
                        <BiSolidShareAlt />
                        <span className="tooltiptext">Bagikan kelas</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className={assignmentStyle}>
                  {assignments.map((a) => (
                    <AssignmentCard
                      key={a?.id}
                      {...a}
                      users={course.users}
                      cid={cid}
                    />
                  ))}
                </div>
              </>
            )}
            {activeButton === "Tugas" && (
              <>
                {user?.fullName === course.users?.fullName && (
                  <div className={"p-4 w-full h-full"}>
                    <button
                      className={
                        "flex justify-center items-center gap-2 p-2 text-white w-28"
                      }
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <BiPlus size={24} />
                      Buat
                    </button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={() => openAssignmentDialog("material")}
                      >
                        Materi
                      </MenuItem>
                      <MenuItem onClick={() => openAssignmentDialog("task")}>
                        Tugas
                      </MenuItem>
                      <MenuItem
                        onClick={() => openAssignmentDialog("announcement")}
                      >
                        Pengumuman
                      </MenuItem>
                    </Menu>
                  </div>
                )}
                <div className={assignmentStyle}>
                  {assignments.map(
                    (a) =>
                      a.isTask && (
                        <AssignmentCard
                          key={a?.id}
                          {...a}
                          users={course.users}
                        />
                      )
                  )}
                </div>
              </>
            )}
            {activeButton === "Orang" && (
              <>
                <div className={peopleStyle}>
                  <p className={statusStyle}>Pengajar</p>
                  <div>
                    {enrollments.map(
                      (e) =>
                        e.isTeacher && (
                          <EnrollmentCard key={e?.id} {...e?.users} />
                        )
                    )}
                  </div>
                </div>
                <div className={peopleStyle}>
                  <p className={statusStyle}>Pelajar</p>
                  <div>
                    {enrollments.map(
                      (e) =>
                        e.isStudent && (
                          <EnrollmentCard key={e?.id} {...e?.users} />
                        )
                    )}
                  </div>
                </div>
              </>
            )}
            <Dialog open={clipboardOpen} onClose={closeClipboard}>
              <DialogTitle>Course Link</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Below is the link to share with others:
                </DialogContentText>
                <TextField variant="outlined" fullWidth value={link} readOnly />
              </DialogContent>
              <DialogActions>
                <IconButton onClick={() => handleCopyToClipboard(link)}>
                  <BiClipboard />
                </IconButton>
              </DialogActions>
              <DialogTitle>Course Code</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Share this code with others to join the course:
                </DialogContentText>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={cid.substring(0, 8)}
                  readOnly
                />
              </DialogContent>
              <DialogActions className="mb-2">
                <IconButton
                  onClick={() => handleCopyToClipboard(cid.substring(0, 8))}
                >
                  <BiClipboard />
                </IconButton>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openAssignment}
              onClose={handleCloseAssignment}
              fullScreen
            >
              <DialogContent>
                <div className="flex justify-between items-center text-center w-full mb-10">
                  <p className={"text-2xl"}>
                    {assignmentType === "material"
                      ? "Post materi"
                      : assignmentType === "task"
                      ? "Post tugas"
                      : "Post pengumuman"}
                  </p>
                  <button
                    onClick={handleCloseAssignment}
                    className="bg-white flex sm:absolute right-10 justify-center items-center text-2xl w-10 rounded-full hover:bg-slate-200"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="flex flex-col justify-center items-center gap-4 p-4">
                  <div className="card box-shadow flex flex-col justify-center items-center gap-4 p-4 w-full lg:w-3/5 xl:w-1/2 bg-white rounded-md">
                    <TextField
                      required
                      variant="filled"
                      label="judul"
                      className="w-full"
                      onChange={(e) =>
                        setAssignment({ ...assignment, name: e.target.value })
                      }
                    />
                    <label className="w-full">
                      Description (Optional)
                      <ReactQuill
                        className="w-full"
                        theme="snow"
                        onChange={(desc) =>
                          setAssignment({ ...assignment, description: desc })
                        }
                      />
                    </label>
                    {assignmentType === "task" && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DemoItem label="Tenggal waktu">
                            <DatePicker
                              defaultValue={today}
                              minDate={today}
                              onChange={(value) => {
                                var date = new Date(value.$d);
                                var day = date.getDate();
                                var month = date.getMonth() + 1;
                                var year = date.getFullYear();
                                var dueDate = year + "-" + month + "-" + day;
                                setAssignment({ ...assignment, dueDate });
                              }}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    )}
                  </div>
                  {!assignmentType?.match("announcement") && (
                    <div className="card box-shadow flex flex-col justify-center items-center gap-4 p-4 w-full lg:w-3/5 xl:w-1/2 bg-white rounded-md">
                      <p>Lampiran</p>
                      {!attachments.length > 0 ? (
                        <p className="text-center">
                          Belum ada lampiran <br /> (Ukuran maksimal 100MB)
                        </p>
                      ) : (
                        attachments.map((attach) => (
                          <AttachmentCard key={attach.id} {...attach} />
                        ))
                      )}
                      <div className="flex flex-wrap justify-center items-center gap-4 p-4 w-full">
                        {[
                          ["file", <AiOutlineFile />],
                          ["image", <BiImageAlt />],
                          ["video", <BiVideo />],
                        ].map(([type, icon], i) => (
                          <>
                            <label
                              key={i}
                              htmlFor={type}
                              className={
                                "bg-white flex justify-center items-center text-xl border border-black rounded-full w-10 h-10 hover:cursor-pointer"
                              }
                            >
                              {icon}
                            </label>
                            <input
                              type="file"
                              id={type}
                              accept={
                                type === "file"
                                  ? ".pdf, .docx, .xlsx, .pptx"
                                  : type === "image"
                                  ? "image/*"
                                  : "video/*"
                              }
                              onChange={handleUpload}
                              className="hidden"
                            />
                          </>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="card box-shadow flex flex-col items-center gap-4 p-4 bg-white rounded-md mt-4 w-full lg:w-3/5 xl:w-1/2">
                    <p className="text-sm text-center">
                      Pastikan terlebih dahulu informasi yang akan diberikan ke
                      siswa sudah sesuai.
                    </p>
                    <LoadingButton
                      type="submit"
                      loading={onPosting || onUpload}
                      loadingIndicator={
                        onUpload ? "Mengupload" : "Memposting..."
                      }
                      variant="contained"
                      className={"text-white bg-blue-500 w-full sm:w-1/2"}
                      onClick={handleSubmit}
                    >
                      <span>Posting</span>
                    </LoadingButton>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </main>
          <Snackbar
            open={isCopied}
            autoHideDuration={3000}
            onClose={() => setIsCopied(false)}
            message={"Copied to clipboard"}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
          <Snackbar
            open={posted}
            autoHideDuration={3000}
            onClose={() => setPosted(false)}
            message={"Berhasil memposting"}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        </>
      )}
    </ProtectedRoute>
  );
};
