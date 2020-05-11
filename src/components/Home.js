import React, { Component } from 'react'
import Phone from './svg/phone'
import QR from './svg/qr'
import '../css/animation.css'
import '../css/home.css' 
import { Link } from 'react-router-dom'

export class Home extends Component {
    render() {
        return (
            <div className="home-content">
                <div className="main-text">
                    AutoAttendance is a platform which provides fast, easy and  paperfree attendance system with precise stats
                </div>
                <Link to ='/main'>
                        <button className="button">Use AutoAttendance</button>
                    </Link>
                <Phone/>
                <QR/>
            </div>
        )
    }
}

export default Home
