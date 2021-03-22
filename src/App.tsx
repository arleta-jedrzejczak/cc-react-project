import React from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import {Main} from './components/main'
import {User} from './components/user'
import {Register} from './components/register'
import {Login} from './components/login'
import {Post} from './components/post'
import {
   makeStyles,
   Typography,
   Button
} from '@material-ui/core'

const useStyles=makeStyles({
   buttons:{
      margin: '20px'
   }
})



function App() {
   const test_post=[
      {
         image: "https://desenio.pl/bilder/artiklar/zoom/11262_2.jpg?imgwidth=435&qt=",
         title: "Mystic Forest",
         tags: ['forest', 'chillout', 'green', "tree"],
         comments: ['boring comment', 'and another one, slighty longer than the previous'],
         likes: 10,
         author: 11
      }]

   const history = useHistory();
   const classes=useStyles()

   return (
      <div className="App">
         <Switch>
            <Route exact path="/">
               <Typography>Hello from App</Typography>
               
               <Button variant='outlined' color='secondary' className={classes.buttons} onClick={() => history.push("/main")}>Main</Button>
               <Button variant='outlined' color='secondary' className={classes.buttons} onClick={() => history.push("/user")}>User</Button>
               <Button variant='outlined' color='secondary' className={classes.buttons} onClick={() => history.push("/register")}>Register</Button>
               <Button variant='outlined' color='secondary' className={classes.buttons} onClick={() => history.push("/login")}>Login</Button>
               <Button variant='outlined' color='secondary' className={classes.buttons} onClick={() => history.push("/post")}>Post</Button>
            </Route>

            <Route exact path="/main">
               <Main />
            </Route>

            <Route exact path="/user">
               <User />
            </Route>

            <Route exact path="/register">
               <Register />
            </Route>

            <Route exact path="/login">
               <Login />
            </Route>

            <Route exact path="/post">
               <Post 
               img_title={test_post[0].title}
               img_likes={test_post[0].likes}
               img_author={test_post[0].author}
               img_tags={test_post[0].tags}
               img_comments={test_post[0].comments}
               />
            </Route>
         </Switch>
      </div>
   );
}

export default App;
