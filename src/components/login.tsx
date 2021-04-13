import * as React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { MyField } from "./MyField";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    "max-width": "100%",
    "text-align": "center",
    "margin-top": "4rem",
    "font-family": "Roboto, Helvetica, Arial, sans-serif",
  },
  input: {
    padding: ".5rem",
  },
  button: {
    margin: "1.5rem",
  },
}));

interface Values {
  email: string;
  password: string;
}

const validateEmail = (value: string): string => {
  let error: string;
  if (!value) {
    error = "Required!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const validatePassword = (value: string): string => {
  let error: string;
  if (!value) {
    error = "Required!";
  }
  return error;
};

const handleLogin = (values: Values, history) => {
  const user = {
    email: values.email,
    password: values.password,
  };
  axios
    .post("https://damp-ridge-27698.herokuapp.com/users/login", user)
    .then((response) => {
      if (response.status === 200) {
        history.push("/main");
      }
    })
    .catch(function (error) {
      if (error.response.status === 409) {
        const m: string = error.response.data.message;
        const s: string = error.response.status;
      }
    });
};

export const Login = withRouter(({ history }) => {
  const classes = useStyles();
  return (
    <Formik
      validateOnChange={true}
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => handleLogin(values, history)}
    >
      {({ errors, touched, values }) => (
        <div className={classes.container}>
          <Form>
            <div className={classes.input}>
              <Field
                type="email"
                placeholder="Email"
                name="email"
                component={MyField}
                validate={validateEmail}
              />
              {errors.email && touched.email && <div>{errors.email}</div>}
            </div>
            <div className={classes.input}>
              <Field
                type="password"
                placeholder="Password"
                name="password"
                component={MyField}
                validate={validatePassword}
              />
              {errors.password && touched.password && (
                <div>{errors.password}</div>
              )}
            </div>
            <Button
              className={classes.button}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
});
