import React, {useEffect, useState} from 'react';
import axios from "axios";
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';

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


export const PostGrid = () => {

    const classes = useStyles();

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        axios
          .get(`https://damp-ridge-27698.herokuapp.com/posts`)
          .then((res) => {
            setPosts(res.data);
          })
          .catch((err) => console.log(err));
      }, []);

      function renderPosts(){
        return posts.map((post) => {
            return <img className={classes.zdj} src={post.image} />
        })
      }

    return (
        <div className={classes.kupka}>{posts === null ? null : renderPosts()}</div>
    );
}