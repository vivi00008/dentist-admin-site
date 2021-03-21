import React, { useContext } from "react";
import { BrowserRouter, Route,Switch } from "react-router-dom";
import { UserContext } from './context/UserContext'
import Login from './containers/Login'
import ManageUser from './containers/ManageUser'
import ManageRoom from './containers/ManageRoom'
import ManageQueue from './containers/ManageQueue'
import './App.css'
import SideNav from './components/SideNav'
import { Container, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  container:{
    marginLeft:'150px'
  }
})

function App() {
  const user = useContext(UserContext)
  const classes = useStyles()

  const renderRouter = () => {
    return (
      <div className="App">
          <SideNav />
        <Container maxWidth='lg' className={classes.container}>
            <Switch>
              <Route exact path="/manage-room" component={ManageRoom} />
              <Route exact path="/manage-user" component={ManageUser} />
              <Route exact path="/manage-queue" component={ManageQueue} />
            </Switch>
        </Container>
      </div>
    )
  }
  return <BrowserRouter>{user.isAuth ? renderRouter() : <Login />}</BrowserRouter>
}

export default App;
