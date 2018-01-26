
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
    console.log(userTextObj);
    db.putText(userTextObj);
    res.end();
});

// get user text
// http://localhost:9090/putText?userId=11
app.get("/getText", function (req, res) {
    console.log("get");
    let userObj = {userId: req.query.userId};
    console.log(db.getText(userObj));
    res.json();
});

app.listen(9090);

// db.putText();
// db.getText();