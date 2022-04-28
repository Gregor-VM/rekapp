import React, {useEffect} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import Auth from './../../utils/Auth';

interface ProtectedRouteProps extends RouteProps {};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({...rest}) => {

    useEffect(() => {
        if(localStorage.getItem("remember") !== "true"){
            //Auth.logout();
        }
    }, []);

    if(Auth.isAuth()){
        return <Route {...rest}></Route>
    } else {
        return <Redirect to={{pathname: "/login"}}></Redirect>
    }
}

export default ProtectedRoute;

