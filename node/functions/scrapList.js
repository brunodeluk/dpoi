const AWS = require('aws-sdk');
const { baseUrl } = require('../config.json').production;
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        ProjectionExpression: '#tp',
        ExpressionAttributeNames: {
            "#tp": "@type",
        }
    };

    ddb.scan(params, (err, data) => {
        if (err) {
            console.error(err);
            callback(err, null);
        }
        else {
            const result = {};
            data.Items.forEach(item => {
                if (!result[item['@type']]) {
                    result[item['@type']] = 1
                }
            });

            const types = Object.keys(result);

            const response = {
                "@id": `${baseUrl}/scraps/`,
                "@type": [
                    "http://www.w3.org/ns/ldp#BasicContainer"
                ],
                "http://purl.org/dc/terms/title": [
                    {
                    "@value": `Container of all available schema types`
                    }
                ],
                "http://www.w3.org/ns/ldp#contains": types.map(type => `${baseUrl}/${type}/`)
            };

            callback(null, response);
        }
    });
};
