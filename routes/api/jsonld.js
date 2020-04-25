const router = require('express').Router();
const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});
const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'websites';

/**
 * {
                    "@id": "http://acme-scrapping.com/api/NewsArticle/",
                    "@type": [
                      "http://www.w3.org/ns/ldp#BasicContainer"
                    ],
                    "http://purl.org/dc/terms/title": [
                      {
                        "@value": "Container of NewsArticle resources"
                      }
                    ],
                    "http://www.w3.org/ns/ldp#contains": [
                      {
                        "@id": "http://acme-scrapping.com/api/NewsArticle/sha1"
                      },
                      {
                        "@id": "http://acme-scrapping.com/api/NewsArticle/sha2"
                      },
                      {
                        "@id": "http://acme-scrapping.com/api/NewsArticle/sha3"
                      }
                    ]
                  }
 */

router.get('/:container', (req, res) => {
    const container = req.params.container;
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
            res.status(200).json(response);
        }
    });
});

router.get('/:container/:resource', (req, res) => {
    docClient.get({
        TableName: table,
        Key: {
            "@id": req.params.resource
        },
    }, (err, data) => {
        if (err) {
            res.json(err);
        }
        else {
            res.status(200).json(data.Item);
        }
    });
});

module.exports = router;

