const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-1'});
AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));

var server = app.listen(3000, () => {
    console.log('Listening on port ' + server.address().port);
});

