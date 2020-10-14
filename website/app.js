/* Global Variables */
const zipCodeInput = document.getElementById('zip');
const feelingInput = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');

const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const feelingDiv = document.getElementById('content');

// function to generate the specific url of the request
const generateURL = (zipCode)=>{
    // to test use zip code 94040
    const appId='c2853a6fe518648e65a57eaddd0684a2'
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${appId}&units=metric`
    return url;
}




generateBtn.addEventListener('click',generateNewEntry);

async function generateNewEntry (){

// Create a new date instance dynamically with JS
const d = new Date();
const month = d.getMonth()+1;
const newDate = d.getDate()+'.'+ month +'.'+ d.getFullYear();
console.log(newDate);
    
 const zipCode = zipCodeInput.value;
 const feeling = feelingInput.value;
 let temp;

 getTemp(zipCode)
    .then((data)=>{
    temp = data.main.temp;
    console.log(data)
    })
    .then((data)=>{
        console.log(newDate,feeling,temp);
       return postToServer(newDate,feeling,temp);
    })
    .then((data)=>{
      return  getFromServer();
    })
    .then((data)=>{
        updateUI(data);
    })


}


async function getTemp(zipCode){
    const request = await fetch(generateURL(zipCode));
    try {
    const response = await request.json();
    return response;
    } catch (error) {
        console.log(error);
    }
}

async function postToServer(newDate,feeling,temp){

const userInformation = {date:newDate,feeling:feeling,temp:temp};

const request = await fetch('/addUserInformation',{
    
    method:'POST',
    headers:{'Content-Type':'application/json'},
    credentials:'same-origin',
    mode:'cors',
    body:JSON.stringify(userInformation)
})

try {
    const response = request;
    console.log(response);
    return response;
} catch (error) {
    console.log(error);
}

}


async function getFromServer(){
    const request = await fetch('/getData');
    try {
    const response = await request.json();
    console.log(response);
    return response;
    } catch (error) {
        console.log(error);
    }
}

function updateUI(data){
dateDiv.innerText=data.date;
tempDiv.innerText=data.temp;
feelingDiv.innerText=data.feeling;
}