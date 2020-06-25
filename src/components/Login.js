import React, { Component } from 'react'
import '../css/login.css'
import { connect } from 'react-redux';
import {login} from '../state-magement/actions/actions'

export class Login extends Component {

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
