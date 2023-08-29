import { useState } from "react";
import { ProtectedRoute, TaskCard } from "../components";
import { Box, LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../App";
import { api } from "../services/ApiService";

export const ListTaskPage = () => {
  // hooks
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { cid } = useParams();
  const { token } = useContext(AuthContext);

  // variable
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const load = async () => {
      const tasks = await api.get("api/v1/assignments/cid/" + cid, token);
      const getTasks = await tasks.json();
      setTasks(getTasks);
    };
    load();
    setIsLoading(false);
  }, [token]);

  return (
    <ProtectedRoute>
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div
          className={
            "flex flex-col justify-start items-center gap-4 p-2 w-full h-full"
          }
        >
          <div className={"w-28 h-28"}>
            <img
              src={user?.image}
              className={"object-cover w-full h-full rounded-full"}
            />
          </div>
          <div
            className={
              "flex flex-col justify-center items-center gap-4 w-full h-full"
            }
          >
            <p className={"text-2xl p-2 border-b-2 border-black"}>
              {user?.fullName}
            </p>
            <div className={"flex flex-col justify-center gap-4 w-full sm:w-1/2"}>
              {tasks.map((t) => t.isTask && <TaskCard key={t?.id} {...t} />)}
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};
