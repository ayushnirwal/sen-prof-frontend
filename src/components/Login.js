import React, { Component } from 'react'
import '../css/login.css'
import { connect } from 'react-redux';
import {login} from '../state-magement/actions/actions'

export class Login extends Component {
  Password_verification(password) {
    if (password.length <= 7) {
      return false;
    }
    var passwords = new Array();
    passwords.push("[!@#$%^&*]");
    passwords.push("[A-Z]");
    passwords.push("[0-9]");
    passwords.push("[a-z]");
    var count = 0;
    for (var i = 0; i < passwords.length; i++) {
      if (new RegExp(passwords[i]).test(password)) {
        count++;
      }
    }
    var correct = "";
    switch (count) {
      case 0:
      case 1:
        correct="Not Accepted";
        break;
      case 2:
        correct = "Accepted";
        break;
      case 3:
        correct = "Accepted";
        break;
      case 4:
        correct = "Accepted";
        break;
    }
    if (correct === "Accepted") return true;
    else return false;
  }
    state={

    }

    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.login(this.state.username,this.state.password);
    }

    handleChange=(e)=>{
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)


        // send request to server to provide token
        // update global state
        //redirect to home
    }

    render() {
        return (
            <div className="container">

                <h2>LOGIN</h2>
                <form className="form" onSubmit={this.handleSubmit} >
                    <input onChange={this.handleChange} name="username" type="text" placeholder="Username"/>
                    <input onChange={this.handleChange} name="password" type="password" placeholder="Password"/>
                    <button type="submit"> Login </button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    msg:state.reducer1.msg
  });

export default connect(mapStateToProps,{login}) (Login)
