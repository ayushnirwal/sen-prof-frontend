const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
app.use(bodyParser.json())
const zeroPad = (num, places) => String(num).padStart(places, '0')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, '/build')));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});



app.post('/auth/login', function(req, res, next) {
    if(req.body.username == "nirwal" && req.body.password == "jaimatadi@123"){
        console.log("yo")
        res.json({
            token:"1234"
        })
    }
    else{
        console.log("no")
        res.json({
            msg:"incorrect credentials"
        })
    }
});

app.post('/getQR',function(req,res,next){

    console.log(req.body.course);
    console.log("qr request")
    
    let rand_no = zeroPad( Math.round(Math.random() * 100),3);
    res.json({
        code:rand_no
    })

});


app.post('/getStats',function(req,res,next){
 
    console.log("stat request")
    
    let curve =[]
    for(let i=0; i<10;i++){
        curve.push(10-i)
    }
    
    res.json({
        data:[
            {
                course:"HC123",
                curve:curve,
            },
            {
                course:"SM123",
                curve:curve,
            },
            {
                course:"IT123",
                curve:curve,
            }
        ]
    })

});

app.get('/status',function(req,res,next){

    console.log(req.body.course);
    console.log("stat request")
    
    
    res.json({
        status:"ok"
    })

});





const port = process.env.PORT || 8000;
app.listen(port);

console.log('App is listening on port ' + port);
