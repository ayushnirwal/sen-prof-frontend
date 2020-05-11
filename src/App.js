
import React,{Component} from 'react'
import { connect } from 'react-redux';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,Switch
} from 'react-router-dom'
import {loadToken,logout} from './state-magement/actions/actions'

import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import Main from './components/Main'
import Header from './components/Header'
import Home from './components/Home'


class App extends Component{
  componentWillMount =()=>{
    this.props.loadToken()
  }
  isLogin=()=>{
    if(localStorage.getItem("token")==null)
    return false;
    else
    return true
  }

  render(){
  return (
    <Router>
      <Header isLogin={this.isLogin} />
      <Switch>
      
        <PrivateRoute path='/main' isLogin={this.isLogin} component={Main} />
        <Route path="/login"  component={Login}/>
        <Route path="/"  component={Home}/>
        
    
      </Switch>
    </Router>
  ) 
  }
}

const mapStateToProps = (state) => ({
  token:state.reducer1
});

export default connect(mapStateToProps,{loadToken,logout}) (App)