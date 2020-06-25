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





const port = process.env.PORT || 8000;
app.listen(port);

console.log('App is listening on port ' + port);
