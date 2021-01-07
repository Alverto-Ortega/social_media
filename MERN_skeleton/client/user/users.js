//the users component:

//import { IconButton, Link, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import { CallMissedSharp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Person from '@material-ui/icons/Person';
import {Link} from 'react-router-dom';
import {list} from './api-user.js';

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        padding: theme.spacing(1),
        margin: theme.spacing(5)
    }),
    title: {
        margin: '${theme.spacing(4)}px 0 ${theme.spacing(2)}px',
        color: theme.palette.openTitle
    }
}));

//initialize the state with empty array of users
export default function Users() {
    const classes = useStyles();
    const [users, setUsers] = useState([]); //useState hook'
    //useEffect hook serves purpose of componentDidMount, didUpdate, WillUnmount react life cycle methods.
    //this hook allows us to perform side effecs defines in useEffect after every render.
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        list(signal).then((data) => {
            if(data && data.error) {
                console.log(data.error);
            }else{
                setUsers(data);
            }
        });
        //abort fetch call when the component unmounts to avoid memory leakes
        return function cleanup() {
            abortController.abort();
        };
    }, []);
    //actual view content using paper, list, listitem Material-UI componenents:
    return(
        <Paper className = {classes.root} elevation = {4}>
            <Typography variant = "h6" className = {classes.title}>
                All Users
            </Typography>
            <List dense>
                {users.map((item, i) => {
                    return <Link to = {"/user/" + item._id} key = {i}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary = {item.name} />
                            <ListItemSecondaryAction>
                            <IconButton>
                                <ArrowForward/>
                            </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                })}
            </List>
        </Paper>
    )
}