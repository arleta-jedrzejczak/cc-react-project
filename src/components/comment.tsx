import React, {useEffect} from 'react'
import { makeStyles, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles({
   container:{
      margin: '10px 0',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center'
   },
   avatar:{
      marginRight: '16px'
   },
   date:{
      fontSize: '14px'
   }
})

export const Comment=({text="", author, date})=>{
   const classes=useStyles()
   let newDate=new Date(date)   

   useEffect(() => {
      // find user via <author> and set corresponding avatar
   }, [])

   return (
      <div className={classes.container}>
         <Avatar src='' className={classes.avatar}/>

         <div>
            <Typography className={classes.date}>{newDate.toLocaleDateString()}</Typography>
            <Typography>{text}</Typography>
         </div>
      </div>
   )
}
 
