const AWS = require('aws-sdk');
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
                if (!result[item]) {
                    result[item] = 1
                }
            });

            const types = Object.keys(result);

            const response = {
                "@id": `https://76qbahw4n7.execute-api.us-east-1.amazonaws.com/v1/${container}/`,
                "@type": [
                    "http://www.w3.org/ns/ldp#BasicContainer"
                ],
                "http://purl.org/dc/terms/title": [
                    {
                    "@value": `Container of all available schema types`
                    }
                ],
                "http://www.w3.org/ns/ldp#contains": types.map(type => `https://76qbahw4n7.execute-api.us-east-1.amazonaws.com/v1/${type}/`)
            };

            callback(null, response);
        }
    });
};