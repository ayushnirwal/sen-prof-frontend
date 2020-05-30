import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {logout} from '../state-magement/actions/actions'
import { connect } from 'react-redux'

export class Header extends Component {
    render() {
        if(this.props.isLogin())
            return (
                <div className="navbar">
                    <Link   className="navlinks" 
                                to ="/"
                        >
                            HOME
                    </Link>
                    <a className="navlinks" onClick = {this.props.logout}>
                        LOGOUT
                    </a>
                </div>
            )
            else{
                return (
                    <div className="navbar">

                    <Link   className="navlinks" 
                                to ="/"
                        >
                            HOME
                    </Link>

                     
                        <Link   className="navlinks" 
                                to ="/login"
                        >
                            LOGIN
                        </Link>
                    </div>
                )
            }
        
    }
}
const mapStateToProps = (state) => ({
    msg:state.reducer1.msg
  });

export default connect(mapStateToProps,{logout})(Header)
