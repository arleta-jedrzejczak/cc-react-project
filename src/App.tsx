import React from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import {Main} from './components/main'
import {User} from './components/user'
import {Register} from './components/register'
import {Login} from './components/login'
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
         </Switch>
      </div>
   );
}

export default App;
