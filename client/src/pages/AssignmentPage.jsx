import { AttachmentViewCard, ProtectedRoute } from "../components";
import { AiOutlineClose, AiOutlineFile } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../App";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useEffect } from "react";
import { api } from "../services/ApiService";

export const AssignmentPage = () => {
  // variable
  const user = JSON.parse(localStorage.getItem("user"));
  const date = new Date();

  // context
  const { token } = useContext(AuthContext);

  // hooks
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState("")
  const [attachments, setAttachments] = useState([])
  const [assignment, setAssignment] = useState({})
  const { aid } = useParams();

  useEffect(() => {
    const load = async () => {
      const getAssignment = await api.get("api/v1/assignments/aee1c9d7-8a4e-4da7-abee-0d1324b562ae", token);
      const resultAssignment = await getAssignment.json();
      setAssignment(resultAssignment);

      const getAttachments = await api.get("api/v1/attachments?aid=aee1c9d7-8a4e-4da7-abee-0d1324b562ae", token);
      const resultAttachments = await getAttachments.json()
      setAttachments(resultAttachments);
    }
    load();
  }, [token, setAttachments, setAssignment])

  return (
    <ProtectedRoute>
      <div className={"flex flex-col justify-center items-center gap-4 w-full"}>
        <header className={"flex justify-between items-center gap-10 p-2 border-b-2 red bg w-full"}>
          <div>
            <p className={"red-text text-2xl"}>Belajar spring boot</p>
            <p className={"text-slate-400"}>
              {user?.fullName}
              {" - "}
              {date.toLocaleString("id", {
                month: "short",
                day: "numeric"
              })}
            </p>
          </div>
        </header>
        <main className={"flex flex-col justify-center items-center gap-4 w-11/12"}>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi dolorum alias, nisi veritatis aperiam aspernatur reiciendis et eum molestias. Ratione, adipisci neque id impedit iure doloremque rem maxime ullam dolore?</p>
          {attachments.map((attach) => (
            <AttachmentViewCard key={attach.id} {...attach} />
          ))}
          {/* <AttachmentViewCard />
          <AttachmentViewCard />
          <AttachmentViewCard />
          <AttachmentViewCard /> */}
        </main>
      </div>
    </ProtectedRoute>
  );
};
