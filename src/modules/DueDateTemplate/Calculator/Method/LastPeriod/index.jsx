import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

export default function LastPeriod({
  lastPeriodDate: propLastPeriodDate,
  setLastPeriodDate: setPropLastPeriodDate,
  cycleLength: propCycleLength,
  setCycleLength: setPropCycleLength,
}) {
  // Nếu có prop thì dùng prop, không thì dùng state cục bộ
  const [lastPeriodDate, setLastPeriodDate] = useState(
    propLastPeriodDate ||
      localStorage.getItem("shared_lastPeriodDate") ||
      new Date().toISOString().split("T")[0]
  );
  const [cycleLength, setCycleLength] = useState(
    propCycleLength || localStorage.getItem("shared_cycleLength") || "28"
  );
  const cycleOptions = Array.from({ length: 26 }, (_, i) => i + 20);

  // Khi thay đổi, cập nhật prop nếu có
  useEffect(() => {
    if (setPropLastPeriodDate) setPropLastPeriodDate(lastPeriodDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastPeriodDate]);
  useEffect(() => {
    if (setPropCycleLength) setPropCycleLength(cycleLength);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleLength]);

  return (
    <>
      <div>
        <TextField
          type="date"
          id="lastPeriodDate"
          value={lastPeriodDate}
          onChange={(e) => setLastPeriodDate(e.target.value)}
          fullWidth
          variant="outlined"
          label=" When did your last period start?"
          className="mb-4 bg-white"
        />
      </div>

      <div>
        <InputLabel id="cycleLength-label" className="fs-4 mb-2">
          Cycle length
        </InputLabel>
        <Select
          labelId="cycleLength-label"
          id="cycleLength"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
          className="bg-white"
        >
          {cycleOptions.map((day) => (
            <MenuItem key={day} value={day}>
              {day} days
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  );
}
