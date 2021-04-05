import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Comment} from './comment'
import {makeStyles, IconButton, Typography, Chip, Menu, MenuItem, Button, TextField} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

interface CommentInterface{
   author: string,
   text: string,
   time: string
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
      display: 'flex',
      alignItems: 'center'
   },
   postImg: {
      width: "100%",
      objectFit: "cover",
   },
   imgContainer: {
      maxHeight: "50vh",
      overflow: "hidden",
   },
   likesContainer:{
      display: 'flex'
   },
   likesCounter:{
      display: 'flex',
      alignItems: 'center',
      fontSize: '24px',
      marginLeft: '14px'
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
   deleteMenu:{
      display: 'flex'
   },
   menuText:{
      textAlign: 'center',
      margin: '10px 0'
   },
   newCommentContainer:{
      padding: '14px',
      display: 'flex',
      alignItems: 'flex-end'
   },
   commentInput:{
      minWidth: '240px',
      width: '30%'
   }
});

export const Post = () => {
   const classes = useStyles();
   const [post, setPost] = useState<PostInterface>();
   const [username, setUsername] = useState<string>();
   const [like, setLike] = useState<-1 | 0 | 1>();
   const [favorite, setFavorite] = useState<boolean>(false);
   const [save, setSave] = useState<boolean>(false);
   const [openDeleteMenu, setOpenDeleteMenu]=useState<boolean>(false)
   const [deleteMenuAnchor, setDeleteMenuAnchor]=useState<null | HTMLElement>()
   const [comment, setComment]=useState<string>("")

   const params: any = useParams();   
   const {id, user}=params  
   

   useEffect(() => {
      id && axios
            .get(`https://damp-ridge-27698.herokuapp.com/posts/${id}`)
            .then(res => {
               setPost(res.data);
               axios
                  .get(`https://damp-ridge-27698.herokuapp.com/users/${res.data.author}`)
                  .then(res => {
                     setUsername(res.data.name);
                  })
                  .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
   }, []);

   const handleFavorite = () => {
      setFavorite(prev => !prev);
      console.log(favorite);
   };

   const handleSave = () => {
      setSave(prev => !prev);
      console.log(save);
   };

   const handleTagClick = tag => {
      console.log(tag);
   };

   const handleDeleteMenu=(event: React.MouseEvent<HTMLButtonElement>)=>{
      setDeleteMenuAnchor(event.currentTarget)
      setOpenDeleteMenu(true)
   }

   const addComment=()=>{
      axios.patch(`https://damp-ridge-27698.herokuapp.com/posts/addComment/${id}`, {
         author: user,
         text: comment
      }).then(res=>setPost(prev=>{
         let date=new Date()
         let _auth:string=user

         const newComment={
            author: _auth,
            text: comment,
            time: date.toString()
         }

         return {...prev, comments: [...prev.comments, newComment]}
      })).catch(err=>console.log(err))

      setComment('')
   }

   const handleDelete=()=>{
      //deleting post
      setOpenDeleteMenu(false)
   }

   const likePLus=()=>{
      //add like
   }

   const likeMinus=()=>{
      //substract like
   }

   // console.log(like);
   // console.log(post);

   return (
      <>
         {post && (
            <>
               <div className={classes.titleContainer}>
                  <Typography variant="h4" className={classes.title}>
                     {post.title}
                  </Typography>

                  <Typography variant="h6" className={classes.title}>
                     {username}        {/* here use rwd layout */}
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

                     <Typography className={classes.likesCounter}>{post.likes}</Typography>
                  </div>

                  <div>
                     <IconButton onClick={handleFavorite}>
                        {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                     </IconButton>

                     <IconButton onClick={handleSave}>
                        {save ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                     </IconButton>

                     {
                        id===user && 
                        <IconButton onClick={handleDeleteMenu}>
                           <DeleteIcon />
                        </IconButton>
                     }
                  </div>

                  <Menu
                     anchorEl={deleteMenuAnchor}
                     open={openDeleteMenu}>
                        <Typography className={classes.menuText}>Are You sure?</Typography>

                        <div className={classes.deleteMenu}>
                           <MenuItem>
                              <Button 
                                 color='secondary' 
                                 variant='outlined' 
                                 onClick={()=>setOpenDeleteMenu(false)}>Canel</Button>
                           </MenuItem>

                           <MenuItem>
                              <Button 
                                 color='secondary' 
                                 variant='outlined' 
                                 onClick={handleDelete}>Delete</Button>
                           </MenuItem>
                        </div>
                  </Menu>
               </div>

               <div className={classes.tagsContainer}>
                  {post.tags.map(tag => (
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
                        color='secondary' 
                        label="Add comment"
                        multiline
                        value={comment}
                        onChange={e=>setComment(e.target.value)}
                        className={classes.commentInput}></TextField>
                     <IconButton onClick={addComment}><AddIcon/></IconButton>
                  </div>

                  {post.comments.map(com=>
                     <Comment 
                        text={com.text}
                        author={com.author}
                        date={com.time}/>
                     )}
               </div>
            </>
         )}
      </>
   );
};
