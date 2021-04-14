import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const IsLogedMenu = () => {
  const history = useHistory();

  function isLogged() {
    if (!sessionStorage.getItem("id")) {
      return (
        <div>
          <Button color="inherit" onClick={() => history.replace(`/login`)}>
            Login
          </Button>
          <Button color="inherit" onClick={() => history.replace(`/register`)}>
            Rejestracja
          </Button>
        </div>
      );
    } else {
      let id = sessionStorage.getItem("id");
      return (
        <IconButton
          onClick={() => history.replace(`/user/${id}`)}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      );
    }
  }

  return <div>{isLogged()}</div>;
};
