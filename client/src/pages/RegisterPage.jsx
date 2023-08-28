import {
  TextField,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  // hooks
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  // handle
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const regist = await fetch("http://localhost:7060/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (regist.status !== 200) {
        // Handle registration error
        setLoading(false);
        setErrorSnackbarOpen(true);
      } else {
        // Registration successful
        setLoading(false);
        setOpenPopup(true);
      }
    } catch (error) {
      setErrorSnackbarOpen(true);
    }
  };

  const handlePopupClose = () => {
    setOpenPopup(false);
    navigate("/login");
  };

  const buttonStyle =
    "flex justify-center items-center gap-4 w-full rounded-3xl p-2 font-bold bg-transparent border border-black";

  const imageStyle = "object-contain w-8 h-8";

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
          "card box-shadow flex flex-col items-center gap-8 p-6 w-11/12 sm:w-2/3 lg:w-1/2 xl:w-1/3 h-[90%] overflow-y-auto bg-white"
        }
      >
        <header>
          <p className="text-2xl font-bold">REGISTER</p>
        </header>
        <form
          className={"flex flex-col gap-4 w-full"}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            fullWidth
          />
          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            fullWidth
          />
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
            loading={loading}
            loadingIndicator="Registering..."
            variant="contained"
            className={"w-full"}
          >
            <span>Register</span>
          </LoadingButton>
          <Link to="/login" underline="hover" className={"text-center"}>
            {"Already have an account? Login here."}
          </Link>
        </form>
        <footer className="flex flex-col gap-4 w-full items-center">
          <p>or register with:</p>
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
      <Dialog open={openPopup} onClose={handlePopupClose}>
        <DialogTitle>Registration Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Registration success! Please check your email ({user?.email}) for
            verification.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handlePopupClose} className={buttonStyle}>
            OK
          </button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbarOpen(false)}
        message={
          "Registration failed, please check the required data and fill it correctly"
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};
