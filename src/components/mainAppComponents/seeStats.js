import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStat } from '../../state-magement/actions/statsAction'
import '../../css/seeStats.css'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import AttRec from './AttRec';
import {getAtt} from '../../state-magement/actions/AttRec'

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="label">{`students:${payload[0].value}`}</p>
          <p className="desc">Click to see student details</p>
        </div>
      );
    }
  
    return null;
  };

export class seeStats extends Component {
    getStat = () => {
        
        this.props.getStat(this.props.token)
    }
    componentWillMount = () => {
        this.getStat();
    
    }
    graphClick = (e) => {
        const graphs = document.getElementById("Graphs-Container");
        const Att = document.getElementById("Attrec-container");
        graphs.style.display = "none";
        Att.style.display = "block";
        const course = e.activePayload[0].payload.course;
        const name = e.activePayload[0].payload.name;
        let low='';
        let high='';
        let i=0;
        while(name[i]!='%'){
            low+=name[i];
            i++;
        }
        i+=5; // offset + sapce + t + o + space
        while(name[i]!='%'){
            high+=name[i];
            i++;
        }

        // request to fetch data
        this.props.getAtt(course,parseInt(low),parseInt(high))
        // put in redux
        
    }
    

    render() {
        let data = undefined

        if (this.props.data != undefined) {

            //let i=0;
            //while(this.props.data[i]!= undefined){
            //    data = data + "<p>"+this.props.data[i].course+ "</p> <p> " + this.props.data[i].above + "</p> <p> " + this.props.data[i].below+"\n";
            //    i++;
            //}

            data = this.props.data.data.map((obj) => {
                const data = obj.curve.map((number, index) => {

                    return {

                        name: ((index-1 + 1) * 10).toString() + '%' + " to " +((index + 1) * 10).toString() + '%', students: number,course:obj.course

                    }
                })
                return (
                    <div key={obj.course}>

                        <div className="Graph-Heading" > {obj.course} </div>
                        <BarChart onClick={this.graphClick} className="Graph" width={1500} height={250} data={data} course={obj.course}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Legend />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="students" fill="#8884d8" />

                        </BarChart>

                        

                    </div>
                )
            })

        }

        return (
            <div>
                <div id="Graphs-Container">{data}</div>
                <AttRec id = "AttRec"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.statReducer.data,
    token: state.reducer1.token
});


export default connect(mapStateToProps, { getStat,getAtt })(seeStats)
