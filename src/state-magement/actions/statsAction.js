import {GET_STATS} from './types'

export function getStat(username){
    return dispatch =>{
        fetch("http://localhost:8000/getStats", { 
      
                // Adding method type 
                method: "POST", 
                
                // Adding body or contents to send 
                body: JSON.stringify({ 
                profUsername:username
                }), 
                
                // Adding headers to the request 
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            }) 
            .then(response => response.json())

            .then(json=>{
                console.log(json)
                dispatch({
                    type:GET_STATS,
                    payload:{
                        data : json
                    }
                })
            })
            .catch(e=>console.log(e))
    }
}
