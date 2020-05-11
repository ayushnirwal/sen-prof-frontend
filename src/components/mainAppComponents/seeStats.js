import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getStat} from '../../state-magement/actions/statsAction'
import '../../css/seeStats.css'

export class seeStats extends Component {
    getStat = () =>{
        this.props.getStat()
    }
    componentWillMount =() =>{
        this.getStat();
    }

    render() {
        let data = undefined
        
        if( this.props.data != undefined)
        {
            
            //let i=0;
            //while(this.props.data[i]!= undefined){
            //    data = data + "<p>"+this.props.data[i].course+ "</p> <p> " + this.props.data[i].above + "</p> <p> " + this.props.data[i].below+"\n";
            //    i++;
            //}
            console.log(this.props.data.data)
            data = this.props.data.data.map((obj)=>{
                const width1 = 2 * obj.above
                const width2 = 2 * obj.below
                return (
                    <div>
                        <span> {obj.course} </span>
                        <span> {obj.above} </span>
                        <span> {obj.below} </span>
                        <br></br>
                        <span style = {{width:width1}} className="attendance-bar-above"> </span>
                        <span style = {{width:width2}} className="attendance-bar-below"> </span>
                    </div>
                )
            })
            
        }
        
        return (
            <div>
                {data}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data:state.statReducer.data,
    token:state.reducer1.token
  });


export default connect(mapStateToProps,{getStat})(seeStats)
