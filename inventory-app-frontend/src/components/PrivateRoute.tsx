import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }: any) => {
    const isAuthenticated = !!localStorage.getItem('authToken');

    return (
        <Route
            {...rest}
            render={(props: any) =>
                isAuthenticated ? (
                    <Element {...props} />
                ) : (
                    <Navigate to="/" />
                )
            }
        />
    );
};

export default PrivateRoute;
