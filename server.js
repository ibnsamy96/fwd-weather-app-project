// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
function listeningFunction(){
    console.log('server is listening on port ' + port);
}
const server = app.listen(port,listeningFunction)





app.post('/addUserInformation',(req,res)=>{
    projectData.date=req.body.date;
    projectData.feeling=req.body.feeling;
    projectData.temp=req.body.temp;
    console.log(projectData);
    return res.send('request sent');
})

app.get('/getData',(req,res)=>{
    return res.send(projectData);
})