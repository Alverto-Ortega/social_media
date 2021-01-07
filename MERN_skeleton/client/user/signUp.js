//the signup component:
export default function Signup(){
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: '',
    });
    //takes new value thats entered in the innut field and set as the state:
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value});
    };
    //when form is submitted. take input values from the state and call create fetch method to sign up the user with backend:
    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        };
        create(user).then((data) => {
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                setValues({...values, error: '', open: true});
            }
        });

    };

    return (
        <div>
            <Card className = {classes.card}>
                <CardContent>
                    <Typography variant = "h6" className = {classes.title}>
                        Sign Up!
                    </Typography>
                    <TextField id = "name" label = "Name" className = {classes.textField} value = {values.name} onChange = {handleChange('email')} margin = "normal" />
                    <br />
                    <TextField id= "email" type= "email" label= "Email" className={classes.textField} value= {values.email} onChange= {handleChange('email')} margin= "normal"/>
                    <br />
                    <TextField id= "password" type= "password" label= "Password" className= {classes.textField} value= {values.password} onChange= {handleChange('password')} margin= "normal"/>
                    <br />
                    {
                        values.error && (<Typography component= "p" color= "error">
                            <Icon color= "error" className= {classes.error}>error</Icon>
                            {values.error}
                        </Typography>)
                    }
                </CardContent>
                <CardActions>
                    <Button color= "primary" variant= "contained" onClick= {clickSubmit} className= {classes.submit}>Submit</Button>
                </CardActions>
            </Card>

            <Dialog open= {values.open} disableBackdropClick= {true}>
                    <DialogTitle>New Account</DialogTitle>
                    <DialogContent>
                        <DialongContentText>
                            Congrats, New Account Successfully Created!
                        </DialongContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link to= "/signin">
                            <Button color= "primary" autoFocus= "autoFocus" variant= "contained">Sign In</Button>
                        </Link>
                    </DialogActions>
            </Dialog>
        </div>
        
    )
}