import * as React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { MyField } from "./MyField";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  title: {
    "font-weight": "bold",
    "font-size": "1.8rem",
  },
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
  nick: string;
  email: string;
  password: string;
}

const validateNick = (value: string): string => {
  let error: string;
  if (!value) {
    error = "Required!";
  } else if (value === "admin") {
    error = "Nice try!";
  }
  return error;
};

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

const validateRepeatPassword = (pass: string, value: string): string => {
  let error: string;
  if (!value) {
    error = "Required!";
  } else if (pass && value) {
    if (pass !== value) {
      error = "Password not matched";
    }
  }
  return error;
};

const handleSubmit = (values: Values, history) => {
  const user = {
    name: values.nick,
    email: values.email,
    password: values.password,
  };
  axios
    .post("https://damp-ridge-27698.herokuapp.com/users/register", user)
    .then((response) => {
      if (response.status === 200) {
        history.push("/main");
      }
    })
    .catch(function (error) {
      if (error) {
        const m: string = error.response.data.message;
        const s: string = error.response.status;
        alert(` Status: ${s} - ${m} `)
      }
    });
};

export const Register = withRouter(({ history }) => {
  const classes = useStyles();
  return (
    <Formik
      validateOnChange={true}
      initialValues={{ nick: "", email: "", password: "", repeatPassword: "" }}
      onSubmit={(value) => handleSubmit(value, history)}
    >
      {({ errors, touched, values }) => (
        <div className={classes.container}>
          <div className={classes.title}>Create an account</div>
          <Form>
            <div className={classes.input}>
              <Field
                placeholder="Nick"
                name="nick"
                component={MyField}
                validate={validateNick}
              />
              {errors.nick && touched.nick && <div>{errors.nick}</div>}
            </div>
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
            <div className={classes.input}>
              <Field
                type="password"
                placeholder="Repeat password"
                name="repeatPassword"
                component={MyField}
                validate={(value) =>
                  validateRepeatPassword(values.password, value)
                }
              />
              {errors.repeatPassword && touched.repeatPassword && (
                <div>{errors.repeatPassword}</div>
              )}
            </div>
            <Button
              className={classes.button}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
});
