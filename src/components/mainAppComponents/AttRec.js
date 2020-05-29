import React, { Component } from 'react'

export class AttRec extends Component {
    close = ()=>{
        const graphs = document.getElementById("Graphs-Container");
        const Att = document.getElementById("Attrec-container");
        graphs.style.display = "block";
        Att.style.display = "none";
    }
    render() {
        return (
            <div id = "Attrec-container" className="Attrec-container">
                <div className="close-btn" onClick={this.close}>
                    X
                </div>

                <div>
                    Kaam baaki
                </div>
            </div>
        )
    }
}

export default AttRec
