import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DatePickerComponent({ max, onChange }) {
  const maxDate = max ? dayjs(max) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="DD-MM-YYYY"
        maxDate={maxDate}
        onChange={onChange}
        slotProps={{
          textField: {
            placeholder: "Date of Birth",
          },
        }}
      />
    </LocalizationProvider>
  );
}
