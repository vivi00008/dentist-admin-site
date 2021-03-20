import React, {useContext} from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import {UserContext} from './context/UserContext'
import Login from './containers/Login'
import ManageRoom from './containers/MangeRoom'
import Schedule from './containers/Schedule'
import './App.css'

function App() {
  const user = useContext(UserContext)
  const renderRouter = () =>{
    return (
      <Switch>
        <Route exact path="/manage-room" component={ManageRoom}/>
        <Route exact path="/schedule" component={Schedule} />
      </Switch>
    )
  }
  return <BrowserRouter>{user.isAuth ? renderRouter(): <Login />}</BrowserRouter>
}

export default App;
