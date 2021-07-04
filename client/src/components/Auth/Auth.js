import React, { useState ,useEffect} from 'react';
import { Container, Typography, Button, Avatar, Paper, Grid, Icon } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory, useLocation } from 'react-router-dom';

import useStyles from './styles';
import Input from './Input';
import { signup, signin, forgetPassword ,resetPassword} from '../../actions/auth';
import GoogleLogin, { googleLogin } from 'react-google-login';
//import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookIcon from '@material-ui/icons/Facebook';
import GIcon from './icon';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function Auth() {

    const search = useLocation().search;
    const resetToken = new URLSearchParams(search).get('resetToken');

    const classes = useStyles();
    const [mode, setMode] = useState('SignIn');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => { resetToken && setMode('resetPassword'); }, [resetToken]);
    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }

    const handleSubmit = (e) => {
        e.preventDefault();
        switch (mode) {
            case 'forgetPassword': dispatch(forgetPassword(formData, history)); break;
            case 'SignUp': dispatch(signup(formData, history)); break;
            case 'SignIn': dispatch(signin({ myAuth:'myAuth',formData}, history)); break;
            case 'resetPassword':
                setFormData({ ...formData, resetToken: resetToken });
                dispatch(resetPassword(formData, history));
                break;
        }
    }

    const googleSuccess = async (res) => {
        console.log('Google Sign In was successful. ' + res)
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
         //   dispatch({ type: 'AUTH', data: { result, token } });
         dispatch(signin({ myAuth:'google',result, token}, history));
            history.push('/');
        } catch (err) { console.log(err); }
    };

    const googleFailure = (error) => { console.log('Google Sign In was unsuccessful. Try again later. ' + error) };
    const responseFacebook = (response) => { console.log(response); 
        try {
            dispatch(signin({ myAuth:'facebook',response}, history));
               history.push('/');
           } catch (err) { console.log(err); }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
                <Typography variant="h5">{
                    {
                        'forgetPassword': "Send new password",
                        'SignUp': 'Sign Up',
                        'SignIn': 'Sign In',
                        'resetPassword': 'Reset password'
                    }[mode]
                }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {mode === 'SignUp' && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        {(mode != 'resetPassword') && (<Input name="email" label="Email Address" handleChange={handleChange} type="email" />)}
                        {(mode != 'forgetPassword') && (<Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={() => setShowPassword((prevShowPassword) => !prevShowPassword)} />)}
                        {(mode == 'resetPassword' || mode == 'SignUp') && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={() => setShowPassword((prevShowPassword) => !prevShowPassword)} />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {{
                            'forgetPassword': "Send new password",
                            'SignUp': 'Sign Up',
                            'SignIn': 'Sign In',
                            'resetPassword': "Save new password"
                        }[mode]}
                    </Button>

                    <label hidden={mode == 'forgetPassword' || mode == 'resetPassword'}>
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
                            <Button onClick={() => { mode == 'SignUp' ? setMode('SignIn') : setMode('SignUp') }}>
                                {mode == 'SignUp' ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                            {mode == 'SignIn' && (<Button onClick={() => setMode('forgetPassword')}> Forget my password </Button>)}
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}