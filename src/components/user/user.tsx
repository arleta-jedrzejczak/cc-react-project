import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  makeStyles,
  Typography,
  Tab,
  Tabs,
  Avatar,
  IconButton,
  Grid,
  Input,
  Menu,
  MenuItem,
  Popover,
  Button,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import { MenuDialog } from "./menuDialog";
import { NewPostDialog } from "./newPostDialog";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { TabPropsInterface } from "./interfaces";

const favorites = [
  {
    image:
      "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
    tags: ["forest", "chillout", "green"],
    coments: [
      "boring comment",
      "and another one, slighty longer than the previous",
    ],
    likes: 10,
    id: "123",
  },
  {
    image:
      "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
    tags: ["forest"],
    coments: ["and another one, slighty longer than the previous"],
    likes: 12,
    id: "123",
  },
  {
    image:
      "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
    tags: ["forest", "chillout", "green"],
    coments: [],
    likes: 10,
    id: "123",
  },
  {
    image:
      "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
    tags: ["forest"],
    coments: ["and another one, slighty longer than the previous"],
    likes: 12,
    id: "123",
  },
  {
    image:
      "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
    tags: [],
    coments: [
      "boring comment",
      "and another one, slighty longer than the previous",
    ],
    likes: 0,
    id: "123",
  },
];

const useStyles = makeStyles((theme) => ({
  userName: {
    color: "#333",
    fontWeight: "bold",
    margin: "10px 0",
  },
  userNav: {
    display: "flex",
    padding: "8px",
    justifyContent: "space-between",
  },
  navBtn: {
    width: "42px",
    height: "42px",
    margin: "0 10px",
  },
  navIcon: {
    width: "30px",
    height: "30px",
  },
  tabHeader: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#111220",
    margin: "10px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    margin: "10px",
  },
  imgContainer: {
    width: "100%",
    height: "100%",
    maxHeight: "40vh",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "28vh",
    },
  },
  postImg: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  editDialog: {
    padding: "10px 30px 20px",
    display: "flex",
    flexDirection: "column",
  },
  closeEditBtn: {
    margin: "10px 10px 0",
  },
  editInput: {
    margin: "10px 0",
  },
  editBtnContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  menu: {
    maxWidth: "200px",
  },
  progress: {
    position: "absolute",
    top: "48vh",
    left: "calc(50vw - 20px)",
  },
  //  XXXXXXXXXXXXXXX      STYLE CHANGE AVATAR POPOVER
}));

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const User = ({ id }) => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState(undefined);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [tabValue, setTabValue] = useState<number>(0);
  const [openEdit, setOpenEdit] = useState(null);
  const [openNewPost, setOpenNewPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [changeAvatarPopover, setChangeAvatarPopover] = useState(false);
  const [changeAvatarPopoverAnchor, setChangeAvatarPopoverAnchor] = useState();
  const [passwordsMatchSnackbar, setPasswordsMatchSnackbar] = useState(false);

  const TabPanel = (props: TabPropsInterface) => {
    return (
      <div hidden={props.value !== props.index} role="tabpanel">
        {props.children}
      </div>
    );
  };

  useEffect(() => {
    axios
      .get(`https://damp-ridge-27698.herokuapp.com/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setPosts(res.data.posts);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setPasswordsMatchSnackbar(false);
  };

  const handleMenuOpen = (e: React.SyntheticEvent) =>
    setMenuAnchor(e.currentTarget);

  const handleMenuClose = () => setMenuAnchor(null);

  const handleTabChange = (_, value: number) => setTabValue(value);

  const handleAddNewPost = (e: React.SyntheticEvent) =>
    setOpenNewPost(e.currentTarget);

  const editUser = (user) => setUser(user);

  const handleEditUser = (e: React.SyntheticEvent) => {
    setOpenEdit(e.currentTarget);
    handleMenuClose();
  };

  const handleAvatarPopover = (e) => {
    setChangeAvatarPopover(true);
    setChangeAvatarPopoverAnchor(e.currentTarget);
    //  XXXXXXXXXXXXXXXXXXX  CREATE PREVIEW OF NEW AVATAR
  };

  const handleSaveAvatar = (e) => {
    //  XXXXXXXXXXXXXXXXXXXXXXXXX     SAVE NEW AVATAR TO DATABASE
  };

  return (
    <>
      {posts && user ? (
        <>
          <div className={classes.userNav}>
            <Typography variant="h5" className={classes.userName}>
              {user.name}
            </Typography>

            <div>
              <IconButton onClick={handleAddNewPost} className={classes.navBtn}>
                <AddIcon className={classes.navIcon} />
              </IconButton>

              <IconButton onClick={handleMenuOpen} className={classes.navBtn}>
                <MenuIcon className={classes.navIcon} />
              </IconButton>

              <Menu
                anchorEl={menuAnchor}
                keepMounted
                id="menu"
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                className={classes.menu}
              >
                <MenuItem id="editBtn" onClick={handleEditUser}>
                  Edit Account
                </MenuItem>
                <MenuItem id="logoutBtn" onClick={() => history.push("/")}>
                  Logout
                </MenuItem>

                <MenuDialog
                  open={openEdit}
                  user={user}
                  editUser={editUser}
                  setAlert={setPasswordsMatchSnackbar}
                  setOpen={setOpenEdit}
                />

                <NewPostDialog
                  open={openNewPost}
                  user={user}
                  setUser={setUser}
                  setPosts={setPosts}
                  setOpen={setOpenNewPost}
                />
              </Menu>
            </div>
          </div>

          <div>
            <Avatar className={classes.avatar} onClick={handleAvatarPopover} />
          </div>

          <Popover
            anchorEl={changeAvatarPopoverAnchor}
            open={changeAvatarPopover}
            onClose={() => {
              setChangeAvatarPopoverAnchor(null);
              setChangeAvatarPopover(false);
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
            <Typography>Choose your avatar picture</Typography>

            <Input type="file" />

            <div>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => setChangeAvatarPopover(false)}
              >
                Canel
              </Button>

              <Button
                color="secondary"
                variant="outlined"
                onClick={handleSaveAvatar}
              >
                Save
              </Button>
            </div>
          </Popover>

          <Tabs onChange={handleTabChange}>
            <Tab
              label="Posts"
              className={classes.tabHeader}
              style={tabValue === 0 ? { color: "#090909" } : { color: "#777" }}
            />
            <Tab
              label="favorites"
              className={classes.tabHeader}
              style={tabValue === 1 ? { color: "#090909" } : { color: "#777" }}
            />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={1}>
              {posts.map((post, i) => (
                <Grid item key={i} xs={6} sm={4} md={3}>
                  <div className={classes.imgContainer}>
                    <img
                      alt="post"
                      src={post.image}
                      onClick={() => history.replace(`/post/${post.id}/${id}`)} //change id to id of current user
                      className={classes.postImg}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={1}>
              {favorites.map((fav, i) => (
                <Grid item key={i} xs={6} sm={4} md={3}>
                  <div className={classes.imgContainer}>
                    <img
                      src={fav.image}
                      alt="post"
                      onClick={() => history.replace(`/post/${fav.id}`)}
                      className={classes.postImg}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </>
      ) : (
        <CircularProgress color="secondary" className={classes.progress} />
      )}

      <Snackbar
        open={passwordsMatchSnackbar}
        autoHideDuration={6000}
        onClose={() => setPasswordsMatchSnackbar(false)}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning">
          Passwords don't match
        </Alert>
      </Snackbar>
    </>
  );
};

User.defaultProps = {
  id: "606a0e06d2dade415814a66d",
};
