
var MongoClient = require('mongodb').MongoClient;

class TalkingDB {
    constructor() {
        this.url = "mongodb://localhost:27017/";
        this.dbName = "talkingdb";
        this.collectionName = "textcollection";
    }

    putText(textObj) {
        MongoClient.connect(this.url).then((db) => {
            let dbo = db.db(this.dbName);
            this.myConnection = dbo.collection(this.collectionName);
            let query = {userId: textObj.userId};
            this.myConnection.findOneAndUpdate(query, {$set: textObj}, {upsert: true}).then(data => {
                db.close();
            });
        });
    }

    getText(userObjQuery) {
        let dbObj = null;
        return MongoClient.connect(this.url).then(db => {
            var dbo = db.db(this.dbName);
            let query = {userId: userObjQuery.userId};
            dbObj = db;
            return dbo.collection(this.collectionName).findOne(query);
        }).then((data) => {
            dbObj.close();
            return data;
        });
    }
}

exports.TalkingDB = TalkingDB;

function testRun() {
    let db = new TalkingDB();
    // db.putText({userId:"11", userText: "hi 11"});

    db.getText({userId: "11"}).then(data => {
        console.log(data);
    });
}

testRun();