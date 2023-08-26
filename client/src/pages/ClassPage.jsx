import { useState } from "react";
import { AssignmentCard, EnrollmentCard, ProtectedRoute } from "../components";
import { Box, LinearProgress } from "@mui/material";
import { BiPencil, BiPlus } from "react-icons/bi";
import { useEffect } from "react";
import { api } from "../services/ApiService";
import { useContext } from "react";
import { AuthContext } from "../App";
import { useParams } from "react-router-dom";

export const ClassPage = () => {
  // variable
  const buttons = ["Forum", "Tugas", "Orang"];
  const user = JSON.parse(localStorage.getItem("user"));

  // hooks
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(buttons[0]);
  const [course, setCourse] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const { cid } = useParams();

  // context
  const { token } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);

    const load = async () => {
      const course = await api.get(
        "api/v1/courses/" + cid,
        token
      );
      const getCourse = await course.json();
      setCourse(getCourse);

      const assignments = await api.get(
        "api/v1/assignments/cid/" + cid,
        token
      );
      const getAssignments = await assignments.json();
      setAssignments(getAssignments);

      const enrollments = await api.get(
        "api/v1/enrollments/cid/" + cid,
        token
      );
      const getEnrollments = await enrollments.json();
      setEnrollments(getEnrollments);
    };
    load();
    setIsLoading(false);
  }, [course, assignments, enrollments]);

  // handle
  const handleButtonClick = (buttonLabel) => {
    setActiveButton(buttonLabel);
  };

  // style
  const assignmentStyle =
    "flex flex-col justify-center items-center gap-4 w-full h-full";
  const peopleStyle = "w-full h-full";
  const statusStyle = "text-2xl font-semibold p-2 border-b-2 border-black";

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
                        "flex justify-center items-center gap-4 w-40 bg-white"
                      }
                    >
                      <BiPencil size={18} />
                      Sesuaikan
                    </button>
                  </div>
                  <div className={"mt-24 sm:mt-32 lg:mt-40"}>
                    <p className={"text-3xl text-white font-bold"}>
                      {course?.name}
                    </p>
                    <p className={"text-white"}>{course?.schedule}</p>
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
                        "flex justify-center items-center gap-2 p-2 text-white"
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
          </main>
        </>
      )}
    </ProtectedRoute>
  );
};
