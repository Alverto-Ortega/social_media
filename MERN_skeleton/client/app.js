import React from "react";
import MainRouter from "./mainRouter";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@material-ui/styles";
import theme from './theme';
import {hot} from "react-hot-loader";


//root custom views component
const App = () => {
    return(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <MainRouter/>
            </ThemeProvider>
        </BrowserRouter>
    )
};
//mark root component as hot exported: live reloading of react components during development
export default hot(module)(App);