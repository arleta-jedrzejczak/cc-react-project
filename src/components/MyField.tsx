import * as React from "react";
import { FieldProps } from "formik";
import { TextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

export const MyField: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  field,
  type
}) => {
  return <TextField type={type} label={placeholder} placeholder={placeholder} {...field}/>;
};