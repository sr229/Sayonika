import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userLoggedIn } from '../utils/login';

export const PrivateRoute = ({ props }) => {
    const { component, render, ...rest } = props;
    return (
        <Route
            {...rest}
            render={routeProps =>
                userLoggedIn() ? (
                    React.createElement(component, routeProps)
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};
