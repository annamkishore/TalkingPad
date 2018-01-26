
const express = require("express");
const app = express();

app.use(express.static("src"));

let {TalkingDB} = require("./TalkingDB");
let db = new TalkingDB();

// save user text
// http://localhost:9090/putText?userId=11&userText=hello
app.get("/putText", function (req, res) {
    console.log("put");
    let userTextObj = {userId: req.query.userId, userText: req.query.userText};
    db.putText(userTextObj);
    res.json(userTextObj);
});

// get user text
// http://localhost:9090/getText?userId=11
app.get("/getText", function (req, res) {
    console.log("get");
    let userObj = {userId: req.query.userId};
    db.getText(userObj).then(data=>{
        res.json(data)
    });
});

app.listen(9090);

// db.putText();
// db.getText();