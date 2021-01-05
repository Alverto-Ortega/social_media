//the users component:

import { IconButton, Link, ListItem, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import { CallMissedSharp } from "@material-ui/icons";
import { useEffect } from "react";

//initialize the state with empty array of users
export default function Users() {
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
        }
    }, []);
    //actual view content using paper, list, listitem Material-UI componenents:
    return(
        <Paper className = {Classes.root} elevation = {4}>
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