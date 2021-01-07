import React  from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./core/home";
import Users from "./user/users";
import Signup from "./user/signUp";
//help render custom react componenets with respect to routes or locations in application.

//add routes for rendering Home, signup,etc.. components:
const MainRouter = () => {
    return (
        <div>
            <Switch> 
                <Route exact path = "/" component = {Home}/>
                <Route path = "/users" component = {Users}/>
                <Route path = "/signup" component = {Signup}/>
            </Switch>
        </div>
    )

};

export default MainRouter;