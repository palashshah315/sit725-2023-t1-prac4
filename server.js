var express = require('express');
var app = express();
let projectCollection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://palashshah315:palashshah315@cluster0.i0bhvhx.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
function connect() {
    client.connect(err => {

        if (err) console.log(err);
        else {
            projectCollection = client.db("test").collection("Cats");
        };
    });
}

const insertProjects = (project, callback) => {
    projectCollection.insertOne(project, callback);
};

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
};

app.post('/api/projects', (req, res) => {
    let newProject = req.body;
    insertProjects(newProject, (error, result) => {
        if (error) {
            res.json({ statusCode: 400, message: error });
        } else {
            res.json({ statusCode: 200, data: result, message: 'successfully added' });
        }
    });
});

app.get('/api/projects', (req, res) => {
    getProjects((error, result) => {
        if (error) {
            res.json({ statusCode: 400, message: error });
        } else {
            res.json({ statusCode: 200, data: result, message: 'Success' });
        }
    });
});


var port = process.env.port || 3000;
app.listen(port, () => {
    console.log('App listening to: ' + port);
    connect();
});