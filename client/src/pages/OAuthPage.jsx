import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { APP_BACKEND, APP_FRONTEND } from "../config/constant";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { json } from "react-router-dom";

export const OAuthPage = () => {
  // variable
  const path = localStorage.getItem("url")

  // hooks
  const email = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(APP_BACKEND + "auth/oauth?email=" + email.search.substring(7), {
      credentials: "include",
    }).then(async (response) => {
      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        window.location.href = APP_FRONTEND + "login?email=" + email.search.substring(7)
      }
      setIsLoading(false);
    });
  }, [email])

  const redirect = () => {
    window.location.href = path;
  }

  return isLoading ? (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {/* Center LinearProgress */}
      <CircularProgress />
    </div>
  ) : redirect()
}
