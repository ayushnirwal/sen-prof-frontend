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

            const id = setInterval(()=>{

                this.props.getQR(this.state.course)
                const canvas = document.getElementById('canvas');

                if(this.props.code != undefined){
                    this.setState({
                        msg:""
                    })
                    QRCode.toCanvas(canvas, this.state.course + this.props.code,{width:250,height:250 }, function (error) {
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
        }
        
    }
        
    handleStop = ()=>{
        clearInterval(this.state.id);
        this.setState({
            id:undefined,
            code:null
        })
        const canvas = document.getElementById('canvas');
        canvas.width=0;
    }

    
    render() {
        let buttons;
        
        if(this.state.id == undefined)
            buttons = (
                <button onClick={this.handleSubmit} className="btn">Take Attendance</button>
            )
        else
            buttons = (
                <div>
                    
                    <button onClick={this.handleStop} className="btn">Stop Attendance</button>
                </div>
            )
        return (
            <div className="dropdown">
                 <label className="label" for="cars">Choose Course:</label>

                    <select onChange={this.handleSelect} name ="course" id="course">
                        <option value="HC123">HC123</option>
                        <option value="SM123">SM123</option>
                        <option value="IT123">IT123</option>
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


