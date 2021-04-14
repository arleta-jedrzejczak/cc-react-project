
import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import { Input } from '@material-ui/core';
import { TopBar } from './main/topBar';
import {PostGrid} from './main/postGrid'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    kupka: {
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap'
    },

    zdj: {
        width: '32vw',
        height: '33vh',
        margin: '0.5vh 0.5vw'
    }
  }),
);

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
          //sessionStorage.setItem('id','606a0e06d2dade415814a66d');
      }, []);



  return (
   <Typography>
    <TopBar></TopBar>
    <PostGrid
      postsState={posts}
    ></PostGrid>
    
  </Typography>
  )
};