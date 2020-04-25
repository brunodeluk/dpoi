const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AWS = require("aws-sdk");
const atob = require('atob');

if (process.env.NODE_ENV === 'production') {
    const [sk, ak] = atob(process.env.A).split(":");
    
    AWS.config.update({
        region: 'us-east-1',
        accessKeyId: ak,
        secretAccessKey: sk
    });
}
else {
    AWS.config.update({
        region: 'us-east-1'
    });
}

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));

var server = app.listen(3000, () => {
    console.log('Listening on port ' + server.address().port);
});
