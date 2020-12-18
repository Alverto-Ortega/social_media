import React  from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./core/Home";
//help render custom react componenets with respect to routes or locations in application.

//add root route for rendering Home component
const MainRouter = () => {
    return (
        <div>
            <Switch> {/*renders a route exclusively */}
                <Route exact path="/" component={Home}/>
                {/* <route... add more view components here */}
            </Switch>
        </div>
    )

};

export default MainRouter;