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
        let printthis = undefined
        let total = undefined
        let percentArray=[0,0,0,0,0,0,0,0,0,0]
        if (this.props.data != undefined) {

            

            printthis= Object.keys(this.props.data).map((key,i) =>{
                percentArray=[0,0,0,0,0,0,0,0,0,0]
                Object.keys(this.props.data[key]).map((key1,i)=>{
                    
                    if(key1 == "total"){
                        total = this.props.data[key][key1]
                        
                    }
                    else{
                        
                        let percent  = (this.props.data[key][key1] / total)*10
                        for(let i=0;i<9;i++){
                            
                            if( percent >= i  && percent < i+1 ){
                                percentArray[i-1]++;
                                break;
                            }
                        }
                        if(percent == 10){
                            percentArray[9]++;
                        }
                        if(percent == 0){
                            percentArray[0]++;
                        }
                        
                    }
                })

                data = percentArray.map((no , i)=>{
                    let name = ( (i*10).toString(10) + "% to " + ((i+1)*10).toString(10) +"%")
                    return{
                        course:key,
                        name,
                        "number of students" : no
                    }
                })
                const course = key
                
                

                return(
                    <div key={key}>

                        <div className="Graph-Heading" > {course} </div>
                        <BarChart onClick={this.graphClick} className="Graph" width={1500} height={250} data={data} course ={key}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Legend />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="number of students" fill="#8884d8" />

                        </BarChart>

                        

                    </div>
                )
                
                
            })
            
            
            
                
            }

        

        return (
            <div>
                <div id="Graphs-Container">{printthis}</div>
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
