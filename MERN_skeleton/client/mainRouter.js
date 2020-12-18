import React  from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./core/home";
//help render custom react componenets with respect to routes or locations in application.

//add root route for rendering Home component
const MainRouter = () => {
    return (
        <div>
            <Switch> 
                <Route exact path="/" component={Home}/>
            </Switch>
        </div>
    )

};

export default MainRouter;