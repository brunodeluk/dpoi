const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

/**
 *   GET /:container/:resource
 */

exports.handler = (event, context, callback) => {
    const resource = event['resource'];
    const container = event['container'];
    ddb.get({
        TableName: process.env.TABLE_NAME,
        Key: {
            "@id": resource
        },
    }, (err, data) => {
        if (err) {
            console.error(err.message, 'GET /%s Error', container);
            callback(err, null);
        }
        else {
            callback(null, data.Item);
        }
    });
};
