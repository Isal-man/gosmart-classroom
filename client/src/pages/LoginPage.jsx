import {
  Link,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";

export const LoginPage = () => {
  // hooks
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState()
  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  // Handle function
  const handleClick = async () => {
    try {
      setLoading(true);

      const request = await fetch("http://localhost:7060/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const response = await request.json();
      localStorage.setItem("user", JSON.stringify(response))
    } catch (error) {
      setLoading(false);
      console.log("Username or Password Invalid");
    }
    const request = await fetch("http://localhost:7060/auth/get-token", {
      credentials: "include"
    });

    const response = await request.json();
    setToken(response.token)
    setLoading(false);
    navigate("/")
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // style
  const buttonStyle =
    "flex justify-center items-center gap-4 w-full rounded-3xl p-2 font-bold bg-transparent border border-black";
  const imageStyle = "object-contain w-8 h-8";
  // const backgroundStyle

  return (
    <div
      className={"flex justify-center items-center w-screen h-screen"}
      style={{
        backgroundImage:
          'url("https://storage.googleapis.com/gosmart-classroom.appspot.com/logo-with-color.jpg")',
        backgroundRepeat: "repeat",
      }}
    >
      <div
        className={
          "card box-shadow flex flex-col items-center gap-8 p-6 w-11/12 sm:w-2/3 lg:w-1/2 xl:w-1/3 bg-white"
        }
      >
        <header>
          <p className="text-2xl font-bold">LOGIN</p>
        </header>
        <form className={"flex flex-col gap-4 w-full"} onSubmit={handleClick}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            fullWidth
          />
          <FormControl className={"w-full"} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              label="Password"
            />
          </FormControl>
          <LoadingButton
            type="submit"
            onClick={handleClick}
            loading={loading}
            loadingIndicator="Login..."
            variant="contained"
            className={"w-full"}
          >
            <span>Login</span>
          </LoadingButton>
          <Link href="/register" underline="hover" className={"text-center"}>
            {"Don't have an account yet?"}
          </Link>
        </form>
        <footer className="flex flex-col gap-4 w-full items-center">
          <p>or login with:</p>
          <button className={buttonStyle}>
            <img src="/logo-google.png" className={imageStyle} />
            Continue with google
          </button>
          <button className={buttonStyle}>
            <img src="/logo-github.png" className={imageStyle} />
            Continue with github
          </button>
        </footer>
      </div>
    </div>
  );
};
