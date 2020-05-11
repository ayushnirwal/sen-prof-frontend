import React, { Component } from 'react'
import{Link} from 'react-router-dom'
import Phone from './../svg/phone'
import '../../css/main.css'
 
export class mainComponent extends Component {
    render() {
        return (
            <div>
                <Link to = "/main/takeAttendance">
                    <div className="main-option-container">
                        Take Attendance
                    </div>
                </Link>
                <Link to = "/main/seeStats">
                    <div className="main-option-container">
                        Attendance Stats
                    </div>
                </Link>
                
            </div>
        )
    }
}

export default mainComponent
