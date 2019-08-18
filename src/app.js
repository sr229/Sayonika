import React, { Component } from 'react';
import LoginPage from './pages/login';
import Navbar from './components/navbar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DemoPage from './pages/zenno';
import IndexPage from './pages/index';
import ModList from './pages/mod_list';
import ModPage from './pages/mod';
import Sayonitheme from './utils/theme';
import EditorsChoice from './pages/editors_choice';
import AllModsPage from './pages/all';

const SayonikaTheme = createMuiTheme(Sayonitheme);

const App = () => {
    return (
        <Router>
            <ThemeProvider theme={SayonikaTheme}>
                <Route exact path="/" component={IndexPage} />
                <Route path="/index" component={IndexPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/mods" component={ModList} />
                <Route path="/editors_choice" component={EditorsChoice} />
                <Route path="/all" component={AllModsPage} />
                <Route path="/mod/:id" component={ModPage} />
                {process.env.NODE_ENV == 'development' ? (
                    <Route path="/zenno" component={DemoPage} />
                ) : null}
            </ThemeProvider>
        </Router>
    );
};

export default App;
