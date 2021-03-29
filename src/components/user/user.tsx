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
  Menu,
  MenuItem,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import { MenuDialog } from "./menuDialog";
import { NewPostDialog } from "./newPostDialog";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { TabPropsInterface } from "./interfaces";

const favourites = [
  {
    image:
      "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
    tags: ["forest", "chillout", "green"],
    coments: [
      "boring comment",
      "and another one, slighty longer than the previous",
    ],
    likes: 10,
    _id: "123",
  },
  {
    image:
      "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
    tags: ["forest"],
    coments: ["and another one, slighty longer than the previous"],
    likes: 12,
    _id: "123",
  },
  {
    image:
      "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
    tags: ["forest", "chillout", "green"],
    coments: [],
    likes: 10,
    _id: "123",
  },
  {
    image:
      "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
    tags: ["forest"],
    coments: ["and another one, slighty longer than the previous"],
    likes: 12,
    _id: "123",
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
    _id: "123",
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
  const [passwordsMatchSnackbar, setPasswordsMatchSnackbar] = useState(false);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setPasswordsMatchSnackbar(false);
  };

  const TabPanel = (props: TabPropsInterface) => {
    return (
      <div hidden={props.value !== props.index} role="tabpanel">
        {props.children}
      </div>
    );
  };

  useEffect(() => {
    axios
      .get("https://calm-escarpment-26540.herokuapp.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://calm-escarpment-26540.herokuapp.com/users`)
      .then((response) => {
        response.data.forEach((_user) => {
          _user._id === id && setUser(_user);
        });
      })
      .catch((err) => console.log(err));
  }, []);

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
                  setPosts={setPosts}
                  setOpen={setOpenNewPost}
                />
              </Menu>
            </div>
          </div>

          <div>
            <Avatar className={classes.avatar} />
          </div>

          <Tabs onChange={handleTabChange}>
            <Tab
              label="Posts"
              className={classes.tabHeader}
              style={tabValue === 0 ? { color: "#090909" } : { color: "#777" }}
            />
            <Tab
              label="Favourites"
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
                      onClick={() => history.replace(`/post/${post._id}`)}
                      className={classes.postImg}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={1}>
              {favourites.map((fav, i) => (
                <Grid item key={i} xs={6} sm={4} md={3}>
                  <div className={classes.imgContainer}>
                    <img
                      src={fav.image}
                      alt="post"
                      onClick={() => history.replace(`/post/${fav._id}`)}
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
  id: "60439c14d3018a344c5e6d3d",
};
