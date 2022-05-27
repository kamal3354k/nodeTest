const fs = require("fs")
const express = require("express")
const app = express();
let data = require("./data"),storeName=[];
let inputErr = "";

// template engine
app.set("view engine", "ejs")


// url encoding into json
let body_parser = require("body-parser"),
    encodeBody = body_parser.urlencoded({
        extended: false
    })

// get request , responsing html page
app.get("/", (req, res) => {
    res.render("index",{err:""})

})

// post request and storing data
app.post("/", encodeBody, (req, res) => {
    for (let i in data) {
        storeName.push(data[i].name)
    }
    if(req.body.name!=""){
        if (!storeName.includes(req.body.name)) {
            data.push(req.body)
            fs.writeFile("./data.json", JSON.stringify(data), (err) => console.log(err, "error"))
            inputErr="User username is added"
        } else {
            inputErr="User username is already exist"
        }
    }
    else{
        inputErr="fill the field"
    }
    res.render("index",{err:inputErr})
})

app.listen(5000)