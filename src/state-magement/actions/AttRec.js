import {GET_ATTREC} from './types'

export function getAtt(course,low,high){
    return dispatch =>{
        fetch("https://sen-react.herokuapp.com/getAttrec", { 
      
                // Adding method type 
                method: "POST", 
                
                // Adding body or contents to send 
                body: JSON.stringify({ 
                    course,
                    low,
                    high
                }), 
                
                // Adding headers to the request 
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            }) 
            .then(response => response.json())

            .then(json=>{
                dispatch({
                    type:GET_ATTREC,
                    payload:{
                        data : json
                    }
                })
            })
            .catch(e=>console.log(e))
    }
}
