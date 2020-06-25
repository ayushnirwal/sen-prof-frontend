import React, { Component } from 'react'
import '../../css/takeAttendance.css'
import {getQR} from '../../state-magement/actions/actions'
import { connect } from 'react-redux';
import QRCode from 'qrcode'

export class takeAttendance extends Component {
    state={
        course:'',
        msg:''
    }
    componentWillMount = () =>{
        this.getCourses();
    }
    handleSelect=(e)=>{
        this.setState({
            course:e.target.value
        })
        
    }
    handleSubmit=()=>{

        if(this.state.course == '' )
        {
            
            this.setState({
                msg:"plz select a course"
            })
        }

        else{
            this.setState({
                msg:""
            })
            fetch("http://127.0.0.1:8000/prof/createLecInstance", { 
      
                // Adding method type 
                method: "POST", 
                
                // Adding body or contents to send 
                body: JSON.stringify({ 
                token: localStorage.getItem("token"),
                course:this.state.course
                }), 
                
                // Adding headers to the request 
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            }) 
            
            // Converting to JSON 
            .then(response => response.json()) 

            .then(( json ) => {
                this.setState({
                    hash:json.hash
                })
                const id = setInterval(()=>{

                    this.props.getQR(this.state.course,this.state.hash)
                    const canvas = document.getElementById('canvas');
                    
                    if(this.props.code != undefined){
                        this.setState({
                            msg:""
                        })
                        QRCode.toCanvas(canvas,this.props.code,{width:250,height:250 }, function (error) {
                            if (error) console.error(error)
        
                        })    
                    }
                    else{
                        setTimeout(() => {
                            this.setState({
                                msg:"Server error"
                            })    
                        }, 1000);
                        
                    }
    
                    
    
    
                },1000)
    
                this.setState({
                    id:id
                })
            })
            
        }
        
    }
        
    handleEnd = ()=>{
        clearInterval(this.state.id);
        this.setState({
            id:undefined,
            code:null
        })
        const canvas = document.getElementById('canvas');
        canvas.width=0;
    }

    handleCancel = () =>{
        fetch("http://127.0.0.1:8000/prof/delLecInstance", { 
      
                // Adding method type 
                method: "POST", 
                
                // Adding body or contents to send 
                body: JSON.stringify({ 
                token: localStorage.getItem("token"),
                course:this.state.course
                }), 
                
                // Adding headers to the request 
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            }) 
            
            // Converting to JSON 
            .then(response => response.json()) 
            
            // Displaying results to console 
            .then(json => {
                this.setState({
                    course:undefined
                })
                clearInterval(this.state.id);
            this.setState({
                id:undefined,
                code:null
            })
            const canvas = document.getElementById('canvas');
            canvas.width=0;
            }).catch(e=>console.log(e))
    }

    getCourses = () => {
        fetch("https://sen-backend.herokuapp.com/getCourseList", { 
      
                // Adding method type 
                method: "POST", 
                
                // Adding body or contents to send 
                body: JSON.stringify({ 
                token: localStorage.getItem("token")
                }), 
                
                // Adding headers to the request 
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            }) 
            
            // Converting to JSON 
            .then(response => response.json()) 
            
            // Displaying results to console 
            .then(json => {
                this.setState({
                    courses:json.courses,
                    course:json.courses[0]
                })
            }).catch(e=>console.log(e))
    }
    
    render() {
        let buttons;
        let choices;

        if(this.state.courses!=undefined){
            
            choices = this.state.courses.map( (course)=>{
                return(
                    <option value={course}>{course}</option>
                )
            })
        }
        
        if(this.state.id == undefined)
            buttons = (
                <button onClick={this.handleSubmit} className="btn">Take Attendance</button>
            )
        else
            buttons = (
                <div>
                    <button onClick={this.handleCancel} className="btn">Cancel Attendance</button>
                    <button onClick={this.handleEnd} className="btn">End Attendance</button>
                </div>
            )
        return (
            <div className="dropdown">
                 <label className="label" for="cars">Choose Course:</label>

                    <select onChange={this.handleSelect} name ="course" id="course">
                        {choices}
                    </select> 
                    <p className="msg">{this.state.msg}</p>
                    <canvas id="canvas"></canvas>
                    
                    <br></br>
                    {buttons}
                    
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    code:state.qrReducer.code
  });

export default connect(mapStateToProps,{getQR}) (takeAttendance)


