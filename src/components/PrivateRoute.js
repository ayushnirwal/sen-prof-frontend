import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
  } from 'react-router-dom'

function isLogin(){
    if(localStorage.getItem("token") != null ){
        return true;
    }
    else{
        return false;
    }
}


const PrivateRoute = ({component: Component, ...rest}) => {
    if (isLogin()){
        return(<Component/>)
    }
    else{
        return(<p>
            <Redirect to ="/login"/>
        </p>)
    }
};
export default PrivateRoute
