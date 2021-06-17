import React, { useState } from 'react';
import { Container, Typography, Button, Avatar, Paper, Grid, Icon } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { signup, signin, forgetPassword } from '../../actions/auth';
import GoogleLogin, { googleLogin } from 'react-google-login';
//import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookIcon from '@material-ui/icons/Facebook';
import GIcon from './icon';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function Auth() {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [forgetPassword, setForgetPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
        setForgetPassword((a) => a = false);
    }
    const switchMode2 = () => { setForgetPassword((a) => !a); }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (forgetPassword) dispatch(forgetPassword(formData, history));
        else isSignup ? dispatch(signup(formData, history)) : dispatch(signin(formData, history));
    }

    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }

    const googleSuccess = async (res) => {
        console.log('Google Sign In was successful. ' + res)
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (err) { console.log(err); }
    };

    const googleFailure = (error) => {console.log('Google Sign In was unsuccessful. Try again later. '+error)};
    const FacebookFailure = (error) => {console.log('Facebook Sign In was unsuccessful. Try again later. '+error)};
    const responseFacebook = (response) => {console.log(response);}
    
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
                <Typography variant="h5>">{forgetPassword ? 'Send new password' : isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}

                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        {!forgetPassword && (<Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />)}
                        {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}

                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {forgetPassword ? 'Send new password' : isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <label hidden={forgetPassword}>   
                     <GoogleLogin 
                        clientId="702271930565-uuumi1db19csujberefugrq67t2eb6g7.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleFacebookButton}
                                color="primary"
                                fullWidth onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<GIcon />}
                                variant='contained'
                            >Google Sign in</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <FacebookLogin 
                        appId="161620452646096"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        render={renderProps => (
                            <Button 
                            className={classes.googleFacebookButton}
                            color="primary"
                            fullWidth onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<FacebookIcon />}
                            variant='contained'
                            onClick={renderProps.onClick}>Facebook Sign in</Button>
                          )}
                    /></label>
                    <Grid container justify="flex-end">
                        <Grid item>

                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                            {!forgetPassword && (<Button onClick={switchMode2}>
                                {isSignup ? "" : "Forget my password"}
                            </Button>)}
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}