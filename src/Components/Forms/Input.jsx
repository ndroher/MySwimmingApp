import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
  fullWidth,
  sx,
  slotProps,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error !== null}
      helperText={error}
      fullWidth={fullWidth}
      sx={sx}
      slotProps={slotProps}
    />
  );
};

export default Input;
