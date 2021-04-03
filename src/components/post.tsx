import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {
   makeStyles,
   IconButton,
   Typography,
   Chip
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';


interface PostInterface{
   _id: string;
   title: string;
   author: string;
   image: string;
   tags: string[];
   comments: string[];
   likes: number;
}

const useStyles=makeStyles({
   title:{
      margin: '20px'
   },
   postImg:{
      width: '100%',
      objectFit: 'cover',
   },
   imgContainer:{
      maxHeight: '50vh',
      overflow: 'hidden'
   },
   iconsContainer:{
      display: 'flex',
      justifyContent: 'space-between'
   },
   tagsContainer:{
      margin: '20px 0'
   },
   tagChip:{
      margin: '0 4px'
   }
})


export const Post = () => {
   const classes = useStyles();
   const [post, setPost] = useState<PostInterface>();
   const [username, setUsername] = useState<string>();
   const [like, setLike]=useState<-1 | 0 | 1>();
   const [favorite, setFavorite]=useState<boolean>(false);
   const [save, setSave]=useState<boolean>(false);

   const params: any = useParams();
   const id = params.id;

   useEffect(() => {
      id &&
         axios
            .get(`https://calm-escarpment-26540.herokuapp.com/posts/${id}`)
            .then(res => {
               setPost(res.data);
               axios.get(`https://calm-escarpment-26540.herokuapp.com/users/${id}`).then(res=>{
                  setUsername(res.data.username)
               }).catch(err=>console.log(err))
            }).catch(err => console.log(err))
   }, []);

   const handleFavorite = () => {
      setFavorite(prev => !prev);
      console.log(favorite);
   };

   const handleSave = () => {
      setSave(prev => !prev);
      console.log(save);
   };

   const handleTagClick=tag=>{
      console.log(tag);
   }

   console.log(like);
   console.log(post);
   
   

   return (
      <>
         {post && (
            <>
               <Typography variant="h4" className={classes.title}>
                  {post.title}
               </Typography>
               <Typography>{post.author}</Typography>

               <div className={classes.imgContainer}>
                  <img alt="post" src={post.image} className={classes.postImg} />
               </div>

               <div className={classes.iconsContainer}>
                  <div>
                     <IconButton onClick={() => setLike(1)}>
                        <ArrowUpwardIcon />
                     </IconButton>

                     <IconButton onClick={() => setLike(-1)}>
                        <ArrowDownwardIcon />
                     </IconButton>
                  </div>

                  <div>
                     <IconButton onClick={handleFavorite}>
                        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                     </IconButton>

                     <IconButton onClick={handleSave}>
                        {save ? <BookmarkIcon/> : <BookmarkBorderIcon />}
                     </IconButton>
                  </div>
               </div>

               <div className={classes.tagsContainer}>
                  {post.tags.map(tag=>
                     <Chip 
                        label={tag}
                        variant='outlined'
                        color='secondary'
                        onClick={()=>handleTagClick(tag)}
                        className={classes.tagChip}/>
                     )
                  }
               </div>
            </>
         )}
      </>
   );
};