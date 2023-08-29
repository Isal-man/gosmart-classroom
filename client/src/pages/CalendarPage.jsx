import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ProtectedRoute } from "../components";
import { useLocation } from "react-router-dom";

export const Calendar = () => {
  const path = useLocation();

  return (
    <ProtectedRoute>
      {localStorage.setItem("url", path.pathname + path.search)}
      <div className="m-auto w-screen h-screen">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </div>
    </ProtectedRoute>
  );
};
