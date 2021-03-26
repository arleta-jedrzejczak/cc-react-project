import React, {useState} from 'react'
import axios from 'axios'
import {
   makeStyles,
   Dialog,
   TextField,
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
   input:{
      margin: '10px 0'
   },
   btnContainer:{
      display: 'flex',
      justifyContent: 'space-between'
   }
})


export const MenuDialog=({open, user, editUser, setOpen, setAlert})=>{
   const classes=useStyles()
   const [username, setUsername]=useState(user.name)
   const [email, setEmail]=useState(user.email)
   const [password, setPassword]=useState('')
   const [passwordRepeat, setPasswordRepeat]=useState('')

   const handleUsernameChange=e=>setUsername(e.currentTarget.value)

   const handleEmailChange=e=>setEmail(e.currentTarget.value)

   const handlePasswordChange=e=>setPassword(e.currentTarget.value)

   const handlePasswordRepeatChange=e=>setPasswordRepeat(e.currentTarget.value)

   const handleSave=()=>{
      if(passwordRepeat===password){
         if(user.name!==username && username!==''){
            axios.patch(`https://calm-escarpment-26540.herokuapp.com/users/editName/${user._id}`, {
               newName: username
            }).then(resp=>console.log(resp))

            editUser({...user, name: username})
         }

         if(user.email!==email && email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
            axios.patch(`https://calm-escarpment-26540.herokuapp.com/users/editEmail/${user._id}`, {
               newEmail: email
            }).then(resp=>console.log(resp))

            editUser({...user, email: email})
         }
         setOpen(null)
      }
      else         
         setAlert(true)  
   }

   return (
      <div>
         <Dialog
            id='userEdit'
            open={open}
            onClose={()=>setOpen(false)}>
               <div className={classes.dialogContainer}>
                  <TextField 
                     label='username' 
                     color='secondary'
                     defaultValue={user.name}
                     className={classes.input}
                     onChange={handleUsernameChange}/>
                  <TextField 
                     label='email' 
                     color='secondary'
                     type="email"
                     defaultValue={user.email}
                     className={classes.input}
                     onChange={handleEmailChange}/>
                  <TextField 
                     label='password' 
                     color='secondary'
                     type='password'
                     className={classes.input}
                     onChange={handlePasswordChange}/>
                  <TextField 
                     label='repeat password' 
                     color='secondary'
                     type='password'
                     className={classes.input}
                     onChange={handlePasswordRepeatChange}/>

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
