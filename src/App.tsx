import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Main } from "./components/main";
import { User } from "./components/user/user";
import { Register } from "./components/register";
import { Login } from "./components/login";
import { Post } from "./components/post";
import { makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
  buttons: {
    margin: "20px",
  },
});

function App() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route exact path="/main">
          <Main />
        </Route>

        <Route exact path="/user">
          <User />
        </Route>

        <Route exact path="/user/:id">
          <User id={sessionStorage.getItem("id") === null || undefined ? '606a0e06d2dade415814a66d': sessionStorage.getItem("id")}></User>
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/post/:postId/:user">
          <Post />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
