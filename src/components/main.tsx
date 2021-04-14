import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { Input } from "@material-ui/core";
import { TopBar } from "./main/topBar";
import { PostGrid } from "./main/postGrid";
import { useStyles } from "./main/styles";

export const Main = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://damp-ridge-27698.herokuapp.com/posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Typography>
      <TopBar></TopBar>
      <PostGrid postsState={posts}></PostGrid>
    </Typography>
  );
};
