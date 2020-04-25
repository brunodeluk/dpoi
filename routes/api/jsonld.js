const router = require('express').Router();
const AWS = require("aws-sdk");
const logger = require('pino')();

AWS.config.update({
    region: "us-east-1",
});
const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'websites';

router.get('/:container', (req, res) => {
    const container = req.params.container;
    logger.info("GET /%s", container);
    docClient.scan({
        TableName: table,
        ProjectionExpression: '#id',
        FilterExpression: '#tp = :type',
        ExpressionAttributeNames: {
            "#tp": "@type",
            "#id": "@id"
        },
        ExpressionAttributeValues: {
          ":type": container
        }
    }, (err, data) => {
        if (err) {
            logger.error(err.message, 'GET /%s Error', container);
            res.json(err);
        }
        else {
            const response = {
                "@id": `http://localhost:3000/api/${container}/`,
                "@type": [
                    "http://www.w3.org/ns/ldp#BasicContainer"
                ],
                "http://purl.org/dc/terms/title": [
                    {
                    "@value": `Container of ${container} resources`
                    }
                ],
                "http://www.w3.org/ns/ldp#contains": data.Items.map(d => `http://localhost:3000/api/${container}/${d['@id']}`)
            }
            logger.info('GET /%s OK', container);
            res.status(200).json(response);
        }
    });
});

router.get('/:container/:resource', (req, res) => {
    logger.info('GET /%s/%s', req.params.container, req.params.resource);
    docClient.get({
        TableName: table,
        Key: {
            "@id": req.params.resource
        },
    }, (err, data) => {
        if (err) {
            logger.error(err.message, 'GET /%s Error', container);
            res.json(err);
        }
        else {
            logger.info('GET /%s/%s OK', req.params.container, req.params.resource);
            res.status(200).json(data.Item);
        }
    });
});

module.exports = router;

