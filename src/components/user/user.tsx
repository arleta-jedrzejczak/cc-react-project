import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
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
   CircularProgress
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import {MenuDialog} from './menuDialog'
import {NewPostDialog} from './newPostDialog'

// const posts=[
//    {
//       image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
//       tags: ['forest', 'chillout', 'green'],
//       coments: ['boring comment', 'and another one, slighty longer than the previous'],
//       likes: 10
//    },
//    {
//       image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
//       tags: ['forest'],
//       coments: ['and another one, slighty longer than the previous'],
//       likes: 12
//    },
//    {
//       image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
//       tags: ['forest', 'chillout', 'green'],
//       coments: [],
//       likes: 10
//    },
//    {
//       image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
//       tags: ['forest'],
//       coments: ['and another one, slighty longer than the previous'],
//       likes: 12
//    },
//    {
//       image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
//       tags: [],
//       coments: ['boring comment', 'and another one, slighty longer than the previous'],
//       likes: 0
//    },
// ]

const favourites=[
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

interface UserInterface {
   _id: string;
   name: string;
   email: string;
   password: string;
   __v: number;
   posts: [];
   favourites: [];
}

interface CommentsInterface {
   author: String;
   text: String;
   time: Date;
}
 
interface PostsInterface{
   _id: string;
   author: string;
   title: string;
   comments?: CommentsInterface[];
   tags: String[];
   likes: Number[];
   image: string;
}

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
   tabHeader:{
      fontSize: '20px',
      fontWeight: 700,
      color: '#111220',
      margin: '10px'
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
      width: '100%',
      height: '100%'
   },
   editDialog:{
      padding: '10px 30px 20px',
      display: 'flex',
      flexDirection: 'column'
   },
   closeEditBtn:{
      margin: '10px 10px 0'
   },
   editInput:{
      margin: '10px 0'
   },
   editBtnContainer:{
      display: 'flex',
      justifyContent: 'space-between'
   }
})


const TabPanel = props => {   
   return (
      <div hidden={props.value !== props.index} role="tabpanel">
         {props.children}
      </div>
   )
}


export const User=({id})=>{
   const classes=useStyles()
   const history=useHistory()
   const [user, setUser]=useState<UserInterface>(undefined)
   const [menuAnchor, setMenuAnchor]=useState(null)
   const [tabValue, setTabValue]=useState<number>(0)
   const [openEdit, setOpenEdit]=useState(false)
   const [openNewPost, setOpenNewPost]=useState(false)
   const [posts, setPosts]=useState([])
   

   useEffect(() => {
      axios.get<PostsInterface[]>('https://calm-escarpment-26540.herokuapp.com/posts').then(response=>{         
         setPosts(response.data)
      }).catch(err=>console.log(err))

      axios.get<UserInterface[]>(`https://calm-escarpment-26540.herokuapp.com/users`).then(response=>{         
         response.data.forEach(_user=>{            
            _user._id===id && setUser(_user)
         });
      }).catch(err=>console.log(err))
   }, [])

   const handleMenuOpen = event => setMenuAnchor(event.currentTarget)

   const handleMenuClose = () => setMenuAnchor(null)

   const handleTabChange=(e, value: number)=>setTabValue(value)

   const handleAddNewPost=e=>setOpenNewPost(e.currentTarget)

   const editUser=user=>setUser(user)

   const handleEditUser=e=>{
      setOpenEdit(e.currentTarget)
      handleMenuClose()
   }


   return(
      <>
         {posts && user ? 
         <>
            <div className={classes.userNav}>
               <Typography 
                  variant='h5' 
                  className={classes.userName}>{user.name}</Typography>

               <div>
                  <IconButton 
                     onClick={handleAddNewPost}
                     className={classes.navBtn}>
                     <AddIcon className={classes.navIcon}/>
                  </IconButton>

                  <IconButton
                     onClick={handleMenuOpen} 
                     className={classes.navBtn}>
                     <MenuIcon className={classes.navIcon}/>
                  </IconButton>

                  <Menu 
                     anchorEl={menuAnchor}
                     keepMounted
                     open={Boolean(menuAnchor)}
                     onClose={handleMenuClose}
                  >
                     <MenuItem onClick={handleEditUser}>Edit Account</MenuItem>
                     <MenuItem onClick={()=>history.push('/')}>Logout</MenuItem>

                     <MenuDialog 
                        open={openEdit} 
                        user={user}
                        editUser={editUser}
                        setOpen={setOpenEdit}/>

                     <NewPostDialog 
                        open={openNewPost}
                        user={user}
                        setOpen={setOpenNewPost}/>
                  </Menu>
               </div>
            </div>

            <div>
               <Avatar className={classes.avatar}/>
            </div>

            <Tabs onChange={handleTabChange}>
               <Tab label='Posts' className={classes.tabHeader}/>
               <Tab label='Favourites' className={classes.tabHeader}/>
            </Tabs>

            <TabPanel index={0} value={tabValue}>
               <Grid 
                  container 
                  spacing={1} 
                  className={classes.gridContainer}>
                  {posts.map((post, i)=>
                     <Grid item key={i}>
                        <div className={classes.imgContainer}>
                           <img 
                              src={post.image} 
                              alt='post' 
                              className={classes.postImg}/>
                        </div>
                     </Grid>
                  )}
               </Grid>
            </TabPanel>
               
            <TabPanel index={1} value={tabValue}>
               <Grid 
                  container 
                  spacing={1} 
                  className={classes.gridContainer}>
                  {favourites.map((post, i)=>
                     <Grid item key={i}>
                        <div className={classes.imgContainer}>
                           <img 
                              src={post.image} 
                              alt='post' 
                              className={classes.postImg}/>
                        </div>
                     </Grid>
                  )}
               </Grid>
            </TabPanel>
         </> : <CircularProgress color='secondary'/>
         }
      </>
   )
}

User.defaultProps={
   id: '60439c14d3018a344c5e6d3d'
}