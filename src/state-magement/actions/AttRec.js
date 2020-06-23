import {GET_ATTREC} from './types'

export function getAtt(course,low,high){
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
                let data = undefined;
                let total = undefined;
                let dataArray = [];
                data = json[course]
                total = data["total"]

                Object.keys(data).map((key,i)=>{
                    if(key != "total"){
                        dataArray.push(
                            {
                                "id":key,
                                "attended":data[key]
                            }
                        )
                    }
                })

                data = {
                    course,
                    low,
                    high,
                    "data":dataArray
                }

                

                

                dispatch({
                    type:GET_ATTREC,
                    payload:{
                        data : data
                    }
                })
            })
            .catch(e=>console.log(e))
    }
}
