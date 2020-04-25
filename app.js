const express = require('express');
const cors = require('cors');
bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ 'error': {
        message: err,
        error: {}
    }});
});

var server = app.listen(3000, () => {
    console.log('Listening on port ' + server.address().port);
});

