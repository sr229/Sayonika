import React from 'react';
import LoginPage from './pages/login';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DemoPage from './pages/zenno';
import IndexPage from './pages/index';
import ModList from './pages/mod_list';
import Sayonitheme from './utils/theme';

const SayonikaTheme = createMuiTheme(Sayonitheme);

const App = () => {
    return (
        <Router>
            <ThemeProvider theme={SayonikaTheme}>
                <Route exact path="/" component={IndexPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/mods" component={ModList} />
                {process.env.NODE_ENV === 'development' ? (
                    <Route path="/zenno" component={DemoPage} />
                ) : null}
            </ThemeProvider>
        </Router>
    );
};

export default App;
