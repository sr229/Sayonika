import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import { Card, RoundIcon, Row, LoginBackground } from '../components/common';
import {
    TextField,
    Box,
    Button,
    Typography,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import { styled } from '@material-ui/styles';

import icon from '../assets/img/logo.svg';
import CONFIG from "../utils/config";
import API from '../utils/api';

const LoginTextField = styled(TextField)(({theme}) => ({
    margin: theme.spacing(1, 0),
    flex: "1 auto"
}));

class LoginPage extends Component {
    state = {
        username: '',
        password: '',
        recaptcha: '',  // TODO: Add recaptcha to login page
        stayLoggedIn: false
    };

    updateUsername(username) {
        this.setState({ username });
    }

    updatePassword(password) {
        this.setState({ password });
    }

    toggleRememberMeState(stayLoggedIn) {
        this.setState({ stayLoggedIn });
    }

    handleLogin = () => {
        let {username, password, recaptcha} = this.state;

        API.login(JSON.stringify({
            username,
            password,
            recaptcha
        })).then(r=>{
            console.log(r);

            const token = r.token;
            API.env.token = token;
            if (this.state.stayLoggedIn){
                window.localStorage.token = token;
            } else {
                window.sessionStorage.token = token
            }
            // TODO: Redirect to main page
        })
    };

    handleSignup = () => {
        // TODO: make request to sign up
    };

    render() {
        const { username, password, stayLoggedIn } = this.state;

        return (
            <LoginBackground>
                <Card style={{overflow: "hidden"}}>
                    <Box style={{margin: "-16px -16px 16px", padding: "16px", color: "white", textAlign: "center"}} bgcolor="primary.main">
                    <RoundIcon src={icon} />
                    <Typography variant="h5">Welcome, please login</Typography>
                    </Box>
                    <div style={{flexDirection: 'column'}}>
                        <div style={{flexDirection: 'column', display: "flex"}}>
                            <LoginTextField
                                label="Username or email address"
                                variant="outlined"
                                onChange={e => this.updateUsername(e.target.value)}
                            />
                            <LoginTextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                onChange={e => this.updatePassword(e.target.value)}
                            />
                        </div>
                        <FormControlLabel
                            label="Remember me"
                            control={
                                <Checkbox
                                    value="Remember me"
                                    checked={stayLoggedIn}
                                    onChange={e =>
                                        this.toggleRememberMeState(e.target.checked)
                                    }
                                />
                            }
                        />
                    </div>
                    <Recaptcha
                        sitekey={CONFIG.CAPTCHA_KEY}
                        verifyCallback={recaptcha=>this.setState({recaptcha})}
                    />
                    <Row style={{display: "flex", justifyContent: "end"}}>
                        <Button onClick={this.handleSignup}>Sign up</Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.handleLogin}
                        >
                            Log in
                        </Button>
                    </Row>
                </Card>
            </LoginBackground>
        );
    }
}

export default LoginPage;
