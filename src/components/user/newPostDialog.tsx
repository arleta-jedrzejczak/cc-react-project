import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import firebase from 'firebase'
import {
   makeStyles,
   Input,
   Typography,
   TextField,
   Dialog,
   Button
} from '@material-ui/core'

interface UserInterface {
   _id: string;
   name: string;
   email: string;
   password: string;
   __v: number;
   posts: [];
   favourites: [];
}


const useStyles=makeStyles({
   dialogContainer:{
      padding: '10px 30px 20px',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '40vw'
   },
   closeBtn:{
      margin: '10px 10px 0'
   },
   editInput:{
      margin: '10px 0'
   },
   editBtnContainer:{
      display: 'flex',
      justifyContent: 'space-between'
   },
   fileInput:{
      margin: '30px 0'
   },
   btnContainer:{
      display: 'flex',
      justifyContent: 'space-around'
   },
   imagePreview:{
      maxHeight: '50vh',
      objectFit: 'cover'
   }
})


export const NewPostDialog=({open, setOpen, user})=>{
   const classes=useStyles()
   const [image, setImage]=useState<string>('')
   const [title, setTitle]=useState<string>('')
   const [tags, setTags]=useState('')
   const [loaded, setLoaded]=useState<boolean>(false)

   const handleSave=()=>{
      if(title && image){         
         axios.post('https://calm-escarpment-26540.herokuapp.com/posts/', {
            image: image,
            title: title,
            tags: [],
            author: user._id
         }).then(resp=>console.log(resp))
      }

      setImage('')
      setOpen(false)
   }

   const handleImage=e=>{
      let img=e.target.files[0];

      firebase.storage().ref(img.name).put(img).then(snapshot=>{
         let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;

         progress===100 && firebase.storage().ref(img.name).getDownloadURL().then(_url=>{
            setImage(_url);
            setLoaded(true);
         }).catch(error=>console.log("shit happens"))
      })
   }

   return (
      <div>
         <Dialog
            id='userEdit'
            open={open}
            onClose={()=>setOpen(false)}>
               <div className={classes.dialogContainer}>
                  <Typography variant='h4'>Add new post</Typography>

                  <TextField label='Title' onChange={e=>setTitle(e.target.value)}/>

                  <TextField label='Tags' onChange={e=>setTags(e.target.value)}/>

                  <Input 
                     type='file' 
                     className={classes.fileInput} 
                     onChange={handleImage}/>

                  {image && <img src={image} alt='preview' className={classes.imagePreview}/>}

                  <div className={classes.btnContainer}>
                     <Button
                        color='secondary'
                        className={classes.closeBtn}
                        onClick={()=>setOpen(null)}>Close</Button>
                     <Button
                        color='secondary'
                        disabled={!loaded || title.length===0}
                        className={classes.closeBtn}
                        onClick={handleSave}>Save</Button>
                  </div>

               </div>
         </Dialog>
      </div>
   )
}

