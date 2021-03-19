import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
   makeStyles,
   Typography,
   Avatar,
   IconButton,
   Grid,
   Menu,
   MenuItem,
   CircularProgress
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'

const posts=[
   {
      image: "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
      tags: ['forest', 'chillout', 'green'],
      coments: ['boring comment', 'and another one, slighty longer than the previous'],
      likes: 10
   },
   {
      image: "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
      tags: ['forest'],
      coments: ['and another one, slighty longer than the previous'],
      likes: 12
   },
   {
      image: "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
      tags: ['forest', 'chillout', 'green'],
      coments: [],
      likes: 10
   },
   {
      image: "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
      tags: ['forest'],
      coments: ['and another one, slighty longer than the previous'],
      likes: 12
   },
   {
      image: "https://images.photowall.com/products/58341/foggy-forest-4.jpg?h=699&q=85",
      tags: [],
      coments: ['boring comment', 'and another one, slighty longer than the previous'],
      likes: 0
   },
]

const useStyles=makeStyles({
   userName:{
      color: '#333',
      fontWeight: 'bold'
   },
   userNav:{
      display: 'flex',
      padding: '8px',
      justifyContent: 'space-between'
   },
   navBtn:{
      width: '42px',
      height: '42px',
      margin: '0 10px'
   },
   navIcon:{
      width: '30px',
      height: '30px'
   },
   avatar:{
      width: '80px',
      height: '80px',
      margin: '10px'
   },
   gridContainer:{
   },
   imgContainer:{
      width: '30vw',
      height: '30vw',
      overflow: 'hidden'
   },
   postImg:{
      objectFit: 'cover',
      height: '100%',
      width: 'auto'
   }
})

export const User=()=>{
   const classes=useStyles()
   // const [posts, setPosts]=useState([])
   const [menuAnchor, setMenuAnchor]=useState(null)

   // useEffect(() => {
   //    axios.get('https://cors-anywhere.herokuapp.com/https://calm-escarpment-26540.herokuapp.com/posts').then(response=>{
   //       console.log(response);
         
   //       setPosts(response.data.users)
   //    }).catch(err=>console.log(err))
   // })

   const handleMenuOpen = (event) => {
      setMenuAnchor(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setMenuAnchor(null);
    };

   

   return(
      <>
         {posts.length ? 
         <>
            <div className={classes.userNav}>
               <Typography variant='h5' className={classes.userName}>User name</Typography>

               <div>
                  <IconButton className={classes.navBtn}>
                     <AddIcon className={classes.navIcon}/>
                  </IconButton>
                  <IconButton className={classes.navBtn}>
                     <MenuIcon 
                        className={classes.navIcon} 
                        onClick={handleMenuOpen}/>
                  </IconButton>

                  <Menu 
                     anchorEl={menuAnchor}
                     keepMounted
                     open={Boolean(menuAnchor)}
                     onClose={handleMenuClose}
                     >
                     <MenuItem onClick={handleMenuClose}>Edit Account</MenuItem>
                     <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                  </Menu>
               </div>
            </div>

            <div>
               <Avatar className={classes.avatar}/>
            </div>

            <Typography variant='h5'>Posts</Typography>

            <Grid container spacing={1} className={classes.gridContainer}>
               {posts.map(post=>
                  <Grid item>
                     <div className={classes.imgContainer}>
                        <img src={post.image} alt='post' className={classes.postImg}/>
                     </div>
                  </Grid>
               )}
            </Grid>

            <Typography variant='h5'>Favourites</Typography>

            <Grid container spacing={1} className={classes.gridContainer}>
               {posts.map(post=>
                  <Grid item>
                     <div className={classes.imgContainer}>
                        <img src={post.image} alt='post' className={classes.postImg}/>
                     </div>
                  </Grid>
               )}
            </Grid>
         </> : <CircularProgress/>
         }
      </>
   )
}

