import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockIcon from '@material-ui/icons/Lock';
import SignUp from './SignUp';
import { postLogin } from '../api/API'
import {useHistory} from "react-router-dom";
import './Style.css';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                KeyNinja
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultProps = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    style: {
        width: '5rem', height:'5rem' 
    },
}

const myStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(14deg, #0b7af3 0%, rgba(11,122,243,0.6))',
        borderRadius: 30,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 7px 14px 0 rgba(80,110,228,0.5)',
    },
    
}));

function LoginButton(){
    const history = useHistory();
    const classes = myStyles();
    async function onClick() {
    
        console.log("hi im here")
        let user = {
            "Email": "michael@keyninja.io",
            "Password":"710X!n713"
        }
        let ret = await postLogin(user)
        if (ret.ok) {
            console.log("OK here")
            history.push('/basicTable')
        }
    }

    return(
        <Button 
        fullWidth
        className={classes.submit}
        onClick = {onClick}>
            Sign In
        </Button>
    )
}


    /*
    const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ "Email": "michael@keyninja.io", "Password": "710X!n713" })
    };
    fetch("https://keyninja-internal.azurewebsites.net/api/MobileLogin/Login", requestOptions)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log(data)
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        */


export default function SignIn() {
    const myClasses = myStyles();
    return (
        <body>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={myClasses.paper}>
                <Card className="card">
                    <CardContent className="card-body">
                <Avatar className="auth">
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in to KeyNinja
        </Typography>
                <form className={myClasses.form} noValidate>
                    <TextField
                        
                        margin="normal"
                        required
                        fullWidth
                        placeholder = "Enter Email"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        placeholder = "Enter Password"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <LoginButton/>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                        </form>
                    </CardContent>
                    </Card>
            </div>
            <Box borderRadius={16}{...defaultProps} mt={16}
                fullWidth        
                >
                <Copyright />
               
            </Box>
            </Container>
            </body>
    );
}