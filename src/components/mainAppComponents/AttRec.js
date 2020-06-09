import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getAtt} from '../../state-magement/actions/AttRec'
import '../../css/seeStats.css'


export class AttRec extends Component {
    close = ()=>{
        const graphs = document.getElementById("Graphs-Container");
        const Att = document.getElementById("Attrec-container");
        graphs.style.display = "block";
        Att.style.display = "none";
    }
    render() {
        let table = undefined
        if(this.props.AttData.AttData!= undefined){
            table = this.props.AttData.AttData.data.map((obj)=>{
                return (
                    <div key={obj.id} className="table-container">
                        <div className="table-content">{obj.id}</div>
                        <div className="table-content">{obj.attended}</div>
                    </div>
                )
            })
        }
        let heading = undefined;
        if(this.props.AttData.AttData!= undefined){
            heading = (
                <div>
                    <div className="heading"> 
                    <p>Students in <b>{this.props.AttData.AttData.course}</b> - Attendance between <b>{this.props.AttData.AttData.low}%</b> and <b>{this.props.AttData.AttData.high}%</b></p>
                         
                    </div>
                </div>
            )
        }
        return (
            <div id = "Attrec-container" className="Attrec-container">
                
                <div className="close-btn" onClick={this.close}>
                    X
                </div>
                {heading}
                <div className="table-container">
                    <div className="table-heading">
                        ID 
                    </div>
                    <div className="table-heading">
                        Lectures attended 
                    </div>
                
                    
                </div>
                {table}
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    AttData:state.AttReducer
  });
export default connect(mapStateToProps,{getAtt}) (AttRec)
