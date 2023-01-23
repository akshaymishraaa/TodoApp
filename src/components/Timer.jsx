import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
// import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

function Timer(props) {
  const [activeTimer, setActiveTimer] = React.useState(false);
    const {value,setValue} = props;
    const time = new Date(value)
    const timeStamp = time.getTime()/1000;
    console.log("valueeeee", timeStamp)


  return (
    <div>
      
        <LocalizationProvider dateAdapter={AdapterDayjs} className="me-2">
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
    </div>
  );
}

export default Timer;
