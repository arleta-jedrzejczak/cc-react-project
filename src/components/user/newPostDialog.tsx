import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {
   makeStyles,
   Input,
   Typography,
   TextField,
   Dialog,
   Button
} from '@material-ui/core'


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
   }
})


export const NewPostDialog=({open, setOpen, user})=>{
   const classes=useStyles()
   const fileReader = new FileReader();
   const [image, setImage]=useState(null)
   const [title, setTitle]=useState('')
   const [tags, setTags]=useState('')

   const handleSave=()=>{
      if(title && image){
         axios.post('https://calm-escarpment-26540.herokuapp.com/posts/', {
            image: image,
            title: title,
            tags: [],
            author: parseInt(user._id)
         }).then(resp=>console.log(resp))
      }

      setOpen(false)
   }

   const handleImage=e=>{
      fileReader.readAsDataURL(e.target.files[0])
      console.log(fileReader);
      
      fileReader.onload=e=>setImage(e.target.result)
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

                  <Input type='file' className={classes.fileInput} onChange={handleImage}/>

                  {image && <img src={image} alt='preview'/>}

                  <div className={classes.btnContainer}>
                     <Button
                        color='secondary'
                        className={classes.closeBtn}
                        onClick={()=>setOpen(null)}>Close</Button>
                     <Button
                        color='secondary'
                        className={classes.closeBtn}
                        onClick={handleSave}>Save</Button>
                  </div>

               </div>
         </Dialog>
      </div>
   )
}

