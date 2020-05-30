
import {LOGIN_FAIL, LOGIN_SUCCESS,LOAD_TOKEN,LOGOUT,GET_QR_FAIL,GET_QR_SUCCESS} from './types'


export function login(username,password) {
  return dispatch =>
  fetch("https://sen-react.herokuapp.com/auth/login", { 
      
    // Adding method type 
    method: "POST", 
      
    // Adding body or contents to send 
    body: JSON.stringify({ 
        username: username, 
        password: password, 
    }), 
      
    // Adding headers to the request 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
}) 
  
// Converting to JSON 
.then(response => response.json()) 
  
// Displaying results to console 
.then(json => {
  if(json.token == undefined){
    dispatch( { 
      type: LOGIN_FAIL,
      payload: {
          msg:json.msg
      }
  }) 
  }
  else{
    localStorage.setItem("token",json.token)
    dispatch( { 
      type: LOGIN_SUCCESS,
      payload: {
          token:json.token
      }
  }) 
  }
}).then(()=>{
  window.location="/main"
})
}

export function loadToken(){
  return dispatch=>{
    const token = localStorage.getItem("token")

    if(token!= undefined){
      dispatch( { 
        type: LOAD_TOKEN,
        payload: {
            token:token
        }
    }) 
    }
    else{
      
    }
  }
}

export function logout(){
  window.location = "/"
  return dispatch=>{
    localStorage.removeItem("token")

    
      dispatch( { 
        type: LOGOUT,
        payload: {
            token:undefined
        }
    }) 
    
  }
}


export function getQR(course) {
  return dispatch =>
  fetch("https://sen-react.herokuapp.com/getQR", { 
      
                // Adding method type 
                method: "POST", 
                
                // Adding body or contents to send 
                body: JSON.stringify({ 
                course:course 
                }), 
                
                // Adding headers to the request 
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            }) 
            
            // Converting to JSON 
            .then(response => response.json()) 
            
            // Displaying results to console 
            .then(json => {

                if(json.code == undefined){
                    console.log(json) 
                }
                else{
                  dispatch( { 
                    type: GET_QR_SUCCESS,
                    payload: {
                        code:json.code
                    }
                }) 
                }
            }).catch(e=>console.log(e))
        }
      
      

