import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import forestImg from './../assets/images/forest.jpg';
import {  Link} from "react-router-dom";

//components will follow code structure:
//imports of libraries, modules, files needed to construct the componenet
//style declarations for componenet elements
//function that defines the React component



//style declarations
//makeStyles is a react hook api provided by material-ui
//JSS style objects
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: "auto",
        marginTop: theme.spacing(5)
    },
    title:{
        padding: "${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px",
        color: theme.palette.openTitle
    },
    media: {
        minHeight:400
    }
}));
//component function definition aka React components
export default function Home(){
    const classes = useStyles();
    
    return(
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
                Home Page
            </Typography>
            <CardMedia className={classes.media} image={forestImg} title="Beautiful forest"/>
            <CardContent>
                <Typography  variant="body2" component="p">
                    Welcome to the RawSpace home page.
                    
                </Typography>
                <Link to = "/users">Users</Link>
                <Link to = "/signup">Sign Up</Link>
                <Link to = "/signin">Sign In</Link>
            </CardContent>
            
        </Card>
        
        
    )
    
};