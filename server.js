const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");




const app = express();

//send files from public folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;
    
    //list id 697cd850a3
    //api key 703812961ac54f4b1c012694f68760aa-us4


    let data ={
        members: [
            {email_address: email,
            status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }}
        ]
    };

    let jsonData = JSON.stringify(data);

    const options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/697cd850a3",
        method: "POST",
        headers: {
            "Authorization": "whateverString 703812961ac54f4b1c012694f68760aa-us4"
        },
        body:jsonData
    };

    request(options, function(error, response, body){

    });

    console.log(firstName, lastName, email);
});

app.listen(3000, function(){
 console.log("Server is running on prot 3000");
 
});

