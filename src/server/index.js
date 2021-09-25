import moment from 'moment';
moment().format();

let projectData = {};

const express = require('express');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js')

const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.send('dist/index.html')
})

app.post('/create', callBack);
function callBack(req, res) {
    projectData = req.body
}

app.get('/all', sendData);
function sendData(req, res) {
    res.send(projectData)
}

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})