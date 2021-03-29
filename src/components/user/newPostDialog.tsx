import React, { useState } from "react";
import axios from "axios";
import firebase from "firebase";
import {
  makeStyles,
  Input,
  Typography,
  TextField,
  Dialog,
  Button,
} from "@material-ui/core";
import { newPostDialogInterface } from "./interfaces";

const useStyles = makeStyles((theme) => ({
  container: {
    "max-width": "90%",
  },
  dialogContainer: {
    padding: "10px 30px 20px",
    display: "flex",
    flexDirection: "column",
  },
  closeBtn: {
    margin: "10px 10px 0",
  },
  editInput: {
    margin: "10px 0",
  },
  editBtnContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  fileInput: {
    margin: "30px 0",
    padding: "10px",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  imagePreview: {
    maxHeight: "50vh",
    objectFit: "cover",
  },
}));

export const NewPostDialog = ({
  open,
  setOpen,
  setPosts,
  user,
}: newPostDialogInterface) => {
  const classes = useStyles();
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleClose = () => {
    setImage("");
    setTitle("");
    setTags("");
    setOpen(false);
  };

  const handleSave = () => {
    let _tags = tags.replace(/  +/g, " ").trim().split(" ");

    if (title && image) {
      axios
        .post("https://calm-escarpment-26540.herokuapp.com/posts/", {
          image: image,
          title: title,
          tags: _tags,
          author: user._id,
        })
        .then((resp) => setPosts((prev) => [...prev, resp.data]));
    }

    setImage("");
    setTitle("");
    setTags("");
    setLoaded(false);
    setOpen(false);
  };

  const handleImage = (e) => {
    let img = e.target.files[0];

    firebase
      .storage()
      .ref(img.name)
      .put(img)
      .then((snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        progress === 100 &&
          firebase
            .storage()
            .ref(img.name)
            .getDownloadURL()
            .then((_url) => {
              setImage(_url);
              setLoaded(true);
            })
            .catch((error) => console.log("shit happens"));
      });
  };

  return (
    <div>
      <Dialog
        id="userEdit"
        open={open}
        classes={{ paperFullWidth: classes.container }}
        onClose={() => setOpen(false)}
      >
        <div className={classes.dialogContainer}>
          <Typography variant="h4">Add new post</Typography>

          <TextField label="Title" onChange={(e) => setTitle(e.target.value)} />

          <TextField label="Tags" onChange={(e) => setTags(e.target.value)} />

          <Input
            type="file"
            className={classes.fileInput}
            onChange={handleImage}
          />

          {image && (
            <img src={image} alt="preview" className={classes.imagePreview} />
          )}

          <div className={classes.btnContainer}>
            <Button
              color="secondary"
              className={classes.closeBtn}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              color="secondary"
              disabled={!loaded || title.length === 0}
              className={classes.closeBtn}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
