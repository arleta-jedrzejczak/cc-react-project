import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Comment } from "./comment";
import {
  makeStyles,
  IconButton,
  Typography,
  Chip,
  Button,
  TextField,
  Popover,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

interface CommentInterface {
  author: string;
  text: string;
  time: string;
}

interface PostInterface {
  _id: string;
  title: string;
  author: string;
  image: string;
  tags: string[];
  comments: CommentInterface[];
  likes: number;
}

const useStyles = makeStyles({
  titleContainer: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px 0",
  },
  title: {
    display: "flex",
    alignItems: "center",
  },
  postImg: {
    width: "100%",
    objectFit: "cover",
  },
  imgContainer: {
    maxHeight: "50vh",
    overflow: "hidden",
  },
  likesContainer: {
    display: "flex",
  },
  likesCounter: {
    display: "flex",
    alignItems: "center",
    fontSize: "24px",
    marginLeft: "14px",
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  tagsContainer: {
    margin: "20px 0",
  },
  tagChip: {
    margin: "0 4px",
  },
  deleteMenu: {
    display: "flex",
  },
  menuText: {
    textAlign: "center",
    margin: "10px 0",
  },
  newCommentContainer: {
    padding: "14px",
    display: "flex",
    alignItems: "flex-end",
  },
  commentInput: {
    minWidth: "240px",
    width: "30%",
  },
  deletePopover: {
    padding: "10px",
  },
  deleteBtn: {
    margin: "10px",
  },
});

export const Post = () => {
  const classes = useStyles();
  const [post, setPost] = useState<PostInterface>();
  const [username, setUsername] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [like, setLike] = useState<-1 | 0 | 1>();
  const [favorite, setFavorite] = useState<boolean>(false);
  const [openDeletePopover, setOpenDeletePopover] = useState<boolean>(false);
  const [
    deleteMenuPopover,
    setDeletePopoverAnchor,
  ] = useState<null | HTMLElement>();
  const [comment, setComment] = useState<string>("");

  const params: any = useParams();
  const { postId, user } = params;

  useEffect(() => {
    postId &&
      axios
        .get(`https://damp-ridge-27698.herokuapp.com/posts/${postId}`)
        .then((res) => {
          setPost(res.data);
          setAuthor(res.data.author);

          axios
            .get(
              `https://damp-ridge-27698.herokuapp.com/users/${res.data.author}`
            )
            .then((res) => {
              setUsername(res.data.name);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
  }, []);

  const handleFavorite = () => {
    setFavorite((prev) => !prev);
    console.log(favorite); // XXXXXXXXXXXXXXXXXXX     SAVE POST TO FAVOURITES
  };

  const handleTagClick = (tag) => {
    console.log(tag);
    //    XXXXXXXXXXXXXXXX        REDIRECT TO MAIN VIEW AND AUTOMATICALLY FILTER POSTS VIA CLICKED TAG
  };

  const handleDeleteMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDeletePopoverAnchor(event.currentTarget);
    setOpenDeletePopover(true);
  };

  const addComment = () => {
    axios
      .patch(
        `https://damp-ridge-27698.herokuapp.com/posts/addComment/${postId}`,
        {
          author: user,
          text: comment,
        }
      )
      .then((res) =>
        setPost((prev) => {
          let date = new Date();
          let _auth: string = user;

          const newComment = {
            author: _auth,
            text: comment,
            time: date.toString(),
          };

          return { ...prev, comments: [...prev.comments, newComment] };
        })
      )
      .catch((err) => console.log(err));

    setComment("");
  };

  const handleDelete = () => {
    //deleting post
    setOpenDeletePopover(false);
  };

  const likePLus = () => {
    // XXXXXXXXXXXXXXXXXXXXXX     ADD LIKE AND SAVE TO DATABASE
  };

  const likeMinus = () => {
    // XXXXXXXXXXXXXXXXXXXXX    SUBSTRACT LIKE AND SAVE TO DATABASE
  };

  return (
    <>
      {post && (
        <>
          <div className={classes.titleContainer}>
            <Typography variant="h4" className={classes.title}>
              {post.title}
            </Typography>

            <Typography variant="h6" className={classes.title}>
              {username}{" "}
              {/*    XXXXXXXXXXXXXXXXXXXXXXX       MAKE RWD LAYOUT   */}
            </Typography>
          </div>

          <div className={classes.imgContainer}>
            <img alt="post" src={post.image} className={classes.postImg} />
          </div>

          <div className={classes.iconsContainer}>
            <div className={classes.likesContainer}>
              <IconButton onClick={() => setLike(1)}>
                <ArrowUpwardIcon />
              </IconButton>

              <IconButton onClick={() => setLike(-1)}>
                <ArrowDownwardIcon />
              </IconButton>

              <Typography className={classes.likesCounter}>
                {post.likes}
              </Typography>
            </div>

            <div>
              <IconButton onClick={handleFavorite}>
                {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>

              {author === user && (
                <IconButton onClick={handleDeleteMenu}>
                  <DeleteIcon />
                </IconButton>
              )}
            </div>

            <Popover
              anchorEl={deleteMenuPopover}
              open={openDeletePopover}
              className={classes.deletePopover}
              onClose={() => {
                setDeletePopoverAnchor(null);
                setOpenDeletePopover(false);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography className={classes.menuText}>
                Are You sure?
              </Typography>

              <div className={classes.deleteMenu}>
                <Button
                  color="secondary"
                  variant="outlined"
                  className={classes.deleteBtn}
                  onClick={() => setOpenDeletePopover(false)}
                >
                  Canel
                </Button>

                <Button
                  color="secondary"
                  variant="outlined"
                  className={classes.deleteBtn}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </Popover>
          </div>

          <div className={classes.tagsContainer}>
            {post.tags.map((tag) => (
              <Chip
                label={tag}
                variant="outlined"
                color="secondary"
                onClick={() => handleTagClick(tag)}
                className={classes.tagChip}
              />
            ))}
          </div>

          <div>
            <div className={classes.newCommentContainer}>
              <TextField
                color="secondary"
                label="Add comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={classes.commentInput}
              ></TextField>
              <IconButton onClick={addComment}>
                <AddIcon />
              </IconButton>
            </div>

            {post.comments.map((com) => (
              <Comment text={com.text} author={com.author} date={com.time} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
