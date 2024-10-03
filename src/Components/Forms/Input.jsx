import React from "react";
import TextField from "@mui/material/TextField";

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
    />
  );
};

export default Input;
