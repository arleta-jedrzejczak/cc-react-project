import React from 'react'
import {
   Typography
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
const test_post=[
    {
       image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
       title: "Forest",
       tags: ['forest', 'chillout', 'green'],
       coments: ['boring comment', 'and another one, slighty longer than the previous'],
       likes: 10,
       author: 11
    }]



export const Post=({img_title, img_likes, img_author, img_tags, img_comments })=>{
    //const tagsItems = test_post[0].tags.map((tag) => <button>{tag}</button>);
    const tagsItems = img_tags.map((tag) => <button>{tag}</button>);
    const commentsList = img_comments.map((comment) => <li>{comment}</li>);
   return(
    <>
      <Typography>Hello from post</Typography>
      <h2>{img_title}</h2>
      <h3>by Author Name: {img_author}</h3>
      <img src="https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=" style={{ width: "250px"}}/>
      <h3>Likes: {img_likes} <FavoriteIcon color="secondary" /></h3> 
      <h3>Tags: {tagsItems}</h3>
      <h3>Comments:</h3>
      <ul>{commentsList}</ul>

    </>
   )
}