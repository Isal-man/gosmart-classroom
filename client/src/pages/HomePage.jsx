import { useState } from "react";
import { ClassCard, ProtectedRoute } from "../components";
import { useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { api } from "../services/ApiService";
import { useContext } from "react";
import { AuthContext } from "../App";
import { Box } from "@mui/material";

export const Home = () => {
  // variable
  const user = JSON.parse(localStorage.getItem("user"));

  // hooks
  const [courseTeacher, setCourseTeacher] = useState([]);
  const [courseStudent, setCourseStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);

      const getTeacherCourses = await api.get(
        "api/v1/courses/s/teacher?email=" + user.email,
        token
      );
      const teacherCourses = await getTeacherCourses.json();
      setCourseTeacher(teacherCourses);

      const getStudentCourses = await api.get(
        "api/v1/courses/s/student?email=" + user.email,
        token
      );
      const studentCourses = await getStudentCourses.json();
      setCourseStudent(studentCourses);

      setIsLoading(false);
    };

    load();
  }, [token]);

  // style
  const groupStyle = "flex flex-col gap-4 w-full";
  const textStyle = "text-xl xl:text-3xl font-bold border-b-2 border-black p-2";
  const classStyle =
    "flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-8 w-full";

  return (
    <ProtectedRoute>
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <main className="flex flex-col md:flex-row md:flex-wrap gap-20 justify-center items-center p-2 h-full w-full">
          {courseTeacher.length > 0 && (
            <div className={groupStyle}>
              <p className={textStyle}>Mengajar</p>
              <div className={classStyle}>
                {courseTeacher.map((classes) => (
                  <ClassCard key={classes?.id} {...classes} />
                ))}
              </div>
            </div>
          )}
          {courseStudent.length > 0 && (
            <div className={groupStyle}>
              <p className={textStyle}>Terdaftar</p>
              <div className={classStyle}>
                {courseStudent.map((classes) => (
                  <ClassCard key={classes?.id} {...classes} />
                ))}
              </div>
            </div>
          )}
          {
            (!courseStudent.length > 0 && !courseTeacher.length > 0) && (
              <div className="text-center">
              <img
                src="https://storage.googleapis.com/gosmart-classroom.appspot.com/logo-with-no-color.png"
                alt="Image Not Found"
                className="w-1/6 h-1/6 mx-auto"
              />
              <p className="text-xl mt-4">Kursus Tidak Ditemukan, temukan dengan mendapatkan kode kursus atau tautan kursus atau buat kursus Anda sendiri</p>
            </div>
            )
          }
        </main>
      )}
    </ProtectedRoute>
  );
};
