let MongoClient = require("mongodb").MongoClient;

//get hero info from database by id
async function getHeroInfo(id) {
    let client = await MongoClient.connect("mongodb://localhost:27017/", {useNewUrlParser: true})
    const db = client.db("main");
    const collection = db.collection("heroes");

    let query1 = {};
    query1[id.toString()] = {$exists: true};

    const result = await collection.find(query1);
    return [result, client];
}

async function getMatchInfo(match_id) {
    let client = await MongoClient.connect("mongodb://localhost:27017/", {useNewUrlParser: true})
    const db = client.db("main");
    const collection = db.collection("matches");

    let query1 = {};
    query1["match_id"] = match_id;

    const result = await collection.find(query1)
    return [result, client];

}

async function getPlayerMatches(account_id) {
    let client = await MongoClient.connect("mongodb://localhost:27017/", {useNewUrlParser: true})
    const db = client.db("main");
    const collection = db.collection("players");

    let query1 = {};
    query1[account_id.toString()] = {$exists: true};

    const result = await collection.find(query1)
    return [result, client];

}

//example how to work with result, that come from DB (make sure to fill database before running)
async function examples() {
    let hero_id = 2
    getHeroInfo(hero_id).then(async function (result) {
        let client = result[1];
        let data = result[0];
        const count = await data.count();
        if (count === 0) {
            console.log("No matches for specified id in database.")
        } else {
            data.forEach(function (doc) {
                console.log(doc[hero_id]);
            })
        }
        return client;
    }).then(function (client) {
        client.close();
    }).catch(function (err) {
        console.log(err);
    })

    let match_id = 54070128750
    getMatchInfo(match_id).then(async function (result) {
        let client = await result[1];
        let data = await result[0];
        const count = await data.count();
        if (count === 0) {
            console.log("No matches for specified id in database.")
        } else {
            data.forEach(function (doc) {
                console.log(doc);
            })
        }
        return client;
    }).then(async function (client) {
        client.close();
    }).catch(function (err) {
        console.log(err);
    })

    let account_id = 369907450
    getPlayerMatches(account_id).then(async function (result) {
        let client = result[1];
        let data = result[0]
        const count = await data.count();
        if (count === 0) {
            console.log("No matches for specified id in database.")
        } else {
            data.forEach(function (doc) {
                console.log(doc[account_id]);
            })
        }
        return client;
    }).then(async function (client) {
        client.close();
    }).catch(function (err) {
        console.log(err);
    })
}

examples();