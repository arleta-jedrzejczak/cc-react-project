import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    margin: "10px 0",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: "16px",
  },
  date: {
    fontSize: "14px",
  },
});

export const Comment = ({ text = "", author, date }) => {
  const classes = useStyles();
  const [avatar, setAvatar] = useState("");
  let newDate = new Date(date);

  useEffect(() => {
    axios.get("https://damp-ridge-27698.herokuapp.com/users/").then((res) => {
      res.data.forEach((user) => {
        if (user._id === author) {
          setAvatar(user.avatar);
        }
      });
    });
  }, []);

  return (
    <div className={classes.container}>
      <Avatar src={avatar} className={classes.avatar} />

      <div>
        <Typography className={classes.date}>
          {newDate.toLocaleDateString()}
        </Typography>
        <Typography>{text}</Typography>
      </div>
    </div>
  );
};
