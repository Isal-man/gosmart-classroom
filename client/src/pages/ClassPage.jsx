import { useState } from "react";
import { AssignmentCard, EnrollmentCard, ProtectedRoute } from "../components";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  TextField,
} from "@mui/material";
import { BiClipboard, BiPencil, BiPlus, BiSolidShareAlt } from "react-icons/bi";
import { useEffect } from "react";
import { api } from "../services/ApiService";
import { useContext } from "react";
import { AuthContext } from "../App";
import { useParams } from "react-router-dom";

export const ClassPage = () => {
  const buttons = ["Forum", "Tugas", "Orang"];

  // hooks
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(buttons[0]);
  const [course, setCourse] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const { cid } = useParams();

  // variable
  const user = JSON.parse(localStorage.getItem("user"));
  const link =
    "http://localhost:5173/course/" +
    cid +
    "/join-course?cc=" +
    cid.substring(0, 8);

  // context
  const { token } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);

    const load = async () => {
      const course = await api.get("api/v1/courses/" + cid, token);
      const getCourse = await course.json();
      setCourse(getCourse);

      const assignments = await api.get("api/v1/assignments/cid/" + cid, token);
      const getAssignments = await assignments.json();
      setAssignments(getAssignments);

      const enrollments = await api.get("api/v1/enrollments/cid/" + cid, token);
      const getEnrollments = await enrollments.json();
      setEnrollments(getEnrollments);
    };
    load();
    setIsLoading(false);
  }, [token, setAssignments, setCourse, setEnrollments]);

  // handle
  const handleButtonClick = (buttonLabel) => {
    setActiveButton(buttonLabel);
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
    closePopup();
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
                    ? "red font-bold text-xs text-center text-gray-600 bg border-b-4 rounded-bl rounded-br p-3 w-28 hover:no-underline"
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
                        "box-shadow flex justify-center items-center gap-4 w-40 bg-white"
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
                      <button className={buttonStyle} onClick={openPopup}>
                        <BiSolidShareAlt />
                        <span className="tooltiptext">Bagikan kelas</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className={assignmentStyle}>
                  {assignments.map((a) => (
                    <AssignmentCard key={a?.id} {...a} users={course.users} />
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
                    >
                      <BiPlus size={24} />
                      Buat
                    </button>
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
            <Dialog open={popupOpen} onClose={closePopup}>
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
          </main>
        </>
      )}
    </ProtectedRoute>
  );
};
