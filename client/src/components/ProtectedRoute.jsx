import { Box, LinearProgress } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";

export const ProtectedRoute = ({ children }) => {
  // hooks
  const [isLoading, setIsLoading] = useState(true);

  // Context
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:7060/auth/get-token", {
      credentials: "include",
    }).then(async (response) => {
      if (response.ok) {
        const getToken = await response.json();
        setToken(getToken.token);
      }
      setIsLoading(false);
    });
  }, [token, setToken]);

  return isLoading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : token ? (
    children
  ) : (
    <Navigate to={"/login"} />
  );
};
