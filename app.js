const express = require("express");
const app = express();
const request = require("request");
const https=require("https");

const bodyParser = require("body-parser");
// const req = require("express/lib/request");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    const jsondata=JSON.stringify(data);
    const url="https://us18.api.mailchimp.com/3.0/lists/5617a3982a";
    const options = {
        method: "POST",
        auth: "Ashutosh:168b2aec9b55c6f663fc226245ae23c3-us18",

    }
    const request=https.request(url, options, function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");

        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsondata);
    request.end();
    console.log(firstname, lastname, email);
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});
app.listen(process.env.PORT ||300, function (req, res) {
    console.log("Server running on port 3000");
})

// 168b2aec9b55c6f663fc226245ae23c3-us18
// 5617a3982a