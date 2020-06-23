import {GET_STATS} from './types'

export function getStat(token){
    return dispatch =>{
        fetch("http://127.0.0.1:8000/prof/getStats", { 
      
                // Adding method type 
                method: "POST", 
                
                // Adding body or contents to send 
                body: JSON.stringify({ 
                token:localStorage.getItem("token")
                }), 
                
                // Adding headers to the request 
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            }) 
            .then(response => response.json())

            .then(json=>{

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
