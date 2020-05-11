import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,Switch
  } from 'react-router-dom'
import takeAttendance from './mainAppComponents/takeAttendance'
import seeStats from './mainAppComponents/seeStats'
import mainComponent from './mainAppComponents/mainComponent'



export class Main extends Component {
    render() {
        return (
            <Router>
                <Switch>


                    <Route path="/main/takeAttendance"  component={takeAttendance}/>
                    <Route path="/main/seeStats"  component={seeStats}/>
                    <Route path="/main" component={mainComponent}/>
                
                </Switch>
            </Router>
        )
    }
}

export default Main
