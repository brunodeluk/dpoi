const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

/**
 *   GET /:container
 */

exports.handler = (event, context, callback) => {
    const container = event['container'];
    ddb.scan({
        TableName: process.env.TABLE_NAME,
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
            console.error(err.message, 'GET /%s Error', container);
            callback(err, null);
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
            console.log('GET /%s OK', container);
            callback(null, response);
        }
    });
};
