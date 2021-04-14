import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
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
