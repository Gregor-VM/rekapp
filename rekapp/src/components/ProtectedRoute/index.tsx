import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import Auth from './../../utils/Auth';

interface ProtectedRouteProps extends RouteProps {};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({...rest}) => {

    if(Auth.isAuth()){
        return <Route {...rest}></Route>
    } else {
        return <Redirect to={{pathname: "/login"}}></Redirect>
    }
}

export default ProtectedRoute;

