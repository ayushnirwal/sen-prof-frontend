import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
  } from 'react-router-dom'

function isLogin(){
    console.log(localStorage.getItem("token"))
    if(localStorage.getItem("token") != null ){
        return true;
    }
    else{
        return false;
    }
}


const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin()?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};
export default PrivateRoute
