import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IsLogedMenu } from "./isLogedMenu";
import { useStyles } from "./styles";

export const TopBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Artian
          </Typography>
          <div className={classes.search}>
            <IsLogedMenu></IsLogedMenu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
