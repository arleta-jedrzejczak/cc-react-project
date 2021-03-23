import React, {useState} from 'react'
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
   }
})


export const NewPostDialog=({open, setOpen})=>{
   const classes=useStyles()

   const handleSave=()=>{
      setOpen(false)
   }

   return (
      <div>
         <Dialog
            id='userEdit'
            open={open}
            onClose={()=>setOpen(false)}>
               <div className={classes.dialogContainer}>

                  <Button
                     color='secondary'
                     className={classes.closeBtn}
                     onClick={()=>setOpen(null)}>Close</Button>
                  <Button
                     color='secondary'
                     className={classes.closeBtn}
                     onClick={handleSave}>Save</Button>
               </div>
         </Dialog>
      </div>
   )
}

