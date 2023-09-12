import {
  AttachmentCard,
  AttachmentViewCard,
  ProtectedRoute,
} from "../components";
import { useContext } from "react";
import { AuthContext } from "../App";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { api } from "../services/ApiService";
import { CircularProgress } from "@mui/material";
import { AiOutlineFile } from "react-icons/ai";
import { BiImageAlt, BiVideo } from "react-icons/bi";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { APP_BACKEND } from "../config/constant";

export const AssignmentPage = () => {
  // variable
  const user = JSON.parse(localStorage.getItem("user"));
  const date = new Date();

  // context
  const { token } = useContext(AuthContext);

  // hooks
  const [isLoading, setIsLoading] = useState(true);
  const [studentAttachments, setStudentAttachments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [teacherAttachments, setTeacherAttachments] = useState([]);
  const [onUpload, setOnUpload] = useState(false);
  const [onPosting, setOnPosting] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [assignment, setAssignment] = useState({});
  const [teacher, setTeacher] = useState({});
  const { aid } = useParams();

  useEffect(() => {
    const load = async () => {
      const getAssignment = await api.get("/api/v1/assignments/" + aid, token);
      const resultAssignment = await getAssignment.json();
      setAssignment(resultAssignment);
      setTeacher({ ...resultAssignment.courses.users });

      const getTeacherAttachments = await api.get(
        "/api/v1/attachments/as/" + aid + "/teacher",
        token
      );
      const resultTeacherAttachments = await getTeacherAttachments.json();
      setTeacherAttachments(resultTeacherAttachments);

      const getStudentAttachments = await api.get(
        "/api/v1/attachments/au/" + aid + "/" + user.email,
        token
      );
      const resultStudentAttachments = await getStudentAttachments.json();
      setStudentAttachments(resultStudentAttachments);
    };
    load();
    setIsLoading(false);
  }, [token]);

  useEffect(() => {
    if (studentAttachments.length > 0) {
      setIsPosting(true);
    }
  }, [studentAttachments]);

  const dueDate = new Date(assignment.dueDate);

  // handle
  const handleUpload = async (e) => {
    try {
      setOnUpload(true);

      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const upload = await axios.post(
        APP_BACKEND + "/api/v1/upload",
        formData
      );

      const result = await upload.data;
      setAttachments([...attachments, result]);
      setOnUpload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsPosting(false);
    setAttachments([...attachments, ...studentAttachments])
  };
  
  const handleSubmit = async () => {
    setOnPosting(true);
    
    if (attachments.length > 0) {
      // Assuming api.post returns a Promise
      const postPromises = attachments.map(attach =>
        api.post(
          "/api/v1/attachments?user=" + user.email + "&assignment=" + aid + "&status=student",
          token,
          attach
        )
      );
      
      await Promise.all(postPromises);
    }
  
    setOnPosting(false);
    setStudentAttachments([...attachments]);
    setAttachments([]);
  };

  return isLoading ? (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {/* Center LinearProgress */}
      <CircularProgress />
    </div>
  ) : (
    <ProtectedRoute>
      <div className={"flex flex-col justify-center items-center gap-4 w-full"}>
        <header
          className={
            "flex justify-between items-center gap-10 p-2 border-b-2 red bg w-full"
          }
        >
          <div>
            <p className={"red-text text-2xl"}>{assignment?.name}</p>
            <p className={"text-slate-400"}>
              {teacher?.fullName}
              {" - "}
              {date.toLocaleString("id", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          {assignment.dueDate && (
            <p className={"font-bold"}>
              Tenggat {": "}
              {dueDate?.toLocaleString("id", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
        </header>
        <main
          className={
            "flex flex-col justify-center items-center gap-4 p-2 w-11/12"
          }
        >
          <div dangerouslySetInnerHTML={{ __html: assignment?.description }} />
          {teacherAttachments.map((attach) => (
            <AttachmentViewCard key={attach.id} {...attach} />
          ))}
          {!user?.fullName.match(teacher?.fullName) && assignment.isTask && (
            <>
              <div className="card box-shadow flex flex-col justify-center items-center gap-4 p-4 w-full lg:w-3/5 xl:w-1/2 bg-white rounded-md">
                {studentAttachments.length > 0 && attachments.length === 0 && isPosting ? (
                  <div className="flex flex-col gap-4 p-2 w-full">
                    {studentAttachments.map((stach) => (
                      <AttachmentViewCard key={stach.id} {...stach} />
                    ))}
                  </div>
                ) : (
                  <>
                    <p>Lampiran</p>
                    {attachments.length === 0 ? (
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
                  </>
                )}
              </div>
              <div className="card box-shadow flex flex-col items-center gap-4 p-4 bg-white rounded-md mt-4 w-full lg:w-3/5 xl:w-1/2">
                <p className="text-sm text-center">
                  Pastikan terlebih dahulu file yang anda lampirkan
                </p>
                <LoadingButton
                  type="submit"
                  disabled={
                    date > dueDate ||
                    (attachments.length === 0 &&
                    attachments.length === studentAttachments.length)
                  }
                  loading={onPosting || onUpload}
                  loadingIndicator={onUpload ? "Mengupload" : "Memposting..."}
                  variant="contained"
                  className={"text-white bg-blue-500 w-full sm:w-1/2"}
                  onClick={isPosting ? handleCancel : handleSubmit}
                >
                  <span>{isPosting ? "Batalkan" : "Posting"}</span>
                </LoadingButton>
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};
