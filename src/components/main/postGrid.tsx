import React, {useEffect, useState} from 'react';
import axios from "axios";
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { postsInterface } from './interfaces'


const useStyles = makeStyles({
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
  });


export const PostGrid = ({postsState = []}:postsInterface) => {

  
    const classes = useStyles();
    const history = useHistory();

      function renderPosts(){
        return postsState.map((post) => {
            return <img onClick={() => history.replace(`/post/${post._id}/${post.author}`)} className={classes.zdj} src={post.image} />
        })
      }

    return (
      <div className={classes.kupka}>{postsState === null ? null : renderPosts()}</div>
    );
}