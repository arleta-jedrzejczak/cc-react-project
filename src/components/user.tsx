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
   CircularProgress,
   Dialog,
   TextField,
   Button
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'

const posts=[
   {
      image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
      tags: ['forest', 'chillout', 'green'],
      coments: ['boring comment', 'and another one, slighty longer than the previous'],
      likes: 10
   },
   {
      image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
      tags: ['forest'],
      coments: ['and another one, slighty longer than the previous'],
      likes: 12
   },
   {
      image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
      tags: ['forest', 'chillout', 'green'],
      coments: [],
      likes: 10
   },
   {
      image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
      tags: ['forest'],
      coments: ['and another one, slighty longer than the previous'],
      likes: 12
   },
   {
      image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
      tags: [],
      coments: ['boring comment', 'and another one, slighty longer than the previous'],
      likes: 0
   },
]

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

export const User=()=>{
   const classes=useStyles()
   const history=useHistory()
   const [menuAnchor, setMenuAnchor]=useState(null)
   const [tabValue, setTabValue]=useState(0)
   const [openEdit, setOpenEdit]=useState(false)
   const [username, setUsername]=useState('User name')
   const [email, setEmail]=useState('User name')
   const [password, setPassword]=useState('User name')
   const [passwordRepeat, setPasswordRepeat]=useState('User name')
   // const [posts, setPosts]=useState([])

   // useEffect(() => {
   //    axios.get('https://calm-escarpment-26540.herokuapp.com/posts').then(response=>{
   //       console.log(response);
         
   //       setPosts(response.data.users)
   //    }).catch(err=>console.log(err))
   // })

   const handleMenuOpen = event => {
      setMenuAnchor(event.currentTarget);
   };

   const handleMenuClose = () => {
      setMenuAnchor(null);
   };

   const handleTabChange=(e, value)=>setTabValue(value)

   const handleEditUser=e=>{
      setOpenEdit(e.currentTarget)
      handleMenuClose()
   }

   const handleUsernameChange=e=>{
      setUsername(e.currentTarget.value)
      console.log(username);
   }
   const handleEmailChange=e=>{
      setEmail(e.currentTarget.value)
      console.log(email);
   }
   const handlePasswordChange=e=>{
      setPassword(e.currentTarget.value)
      console.log(password);
   }
   const handlePasswordRepeatChange=e=>{
      setPasswordRepeat(e.currentTarget.value)
      console.log(passwordRepeat);
   }
   

   return(
      <>
         {posts ? 
         <>
            <div className={classes.userNav}>
               <Typography 
                  variant='h5' 
                  className={classes.userName}>{username}</Typography>

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
                     <MenuItem onClick={handleEditUser}>Edit Account</MenuItem>
                     <MenuItem onClick={()=>history.push('/')}>Logout</MenuItem>

                     <Dialog
                        id='userEdit'
                        open={openEdit}
                        onClose={()=>setOpenEdit(false)}>
                           <div className={classes.editDialog}>
                              <TextField 
                                 label='username' 
                                 color='secondary'
                                 className={classes.editInput}
                                 onChange={handleUsernameChange}/>
                              <TextField 
                                 label='email' 
                                 color='secondary'
                                 className={classes.editInput}
                                 onChange={handleEmailChange}/>
                              <TextField 
                                 label='password' 
                                 color='secondary'
                                 className={classes.editInput}
                                 onChange={handlePasswordChange}/>
                              <TextField 
                                 label='repeat password' 
                                 color='secondary'
                                 className={classes.editInput}
                                 onChange={handlePasswordRepeatChange}/>
                                 <div className={classes.editBtnContainer}>
                                    <Button 
                                       color='secondary'
                                       className={classes.closeEditBtn}
                                       onClick={()=>setOpenEdit(null)}>Save</Button>
                                    <Button 
                                       color='secondary'
                                       className={classes.closeEditBtn}
                                       onClick={()=>setOpenEdit(null)}>Close</Button>
                                 </div>
                           </div>
                     </Dialog>
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
                  {posts.map(post=>
                     <Grid item>
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
                  {favourites.map(post=>
                     <Grid item>
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
         </> : <CircularProgress/>
         }
      </>
   )
}

