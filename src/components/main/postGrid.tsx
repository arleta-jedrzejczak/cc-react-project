import React from "react";
import { useHistory } from "react-router-dom";
import { postsInterface } from "./interfaces";
import { useStyles } from "./styles";

export const PostGrid = ({ postsState = [] }: postsInterface) => {
  const classes = useStyles();
  const history = useHistory();

  function renderPosts() {
    return postsState.map((post) => {
      return (
        <img
          onClick={() => history.replace(`/post/${post._id}/${post.author}`)}
          className={classes.zdj}
          src={post.image}
        />
      );
    });
  }

  return (
    <div className={classes.kupka}>
      {postsState === null ? null : renderPosts()}
    </div>
  );
};
