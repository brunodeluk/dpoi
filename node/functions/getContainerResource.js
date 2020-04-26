const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

/**
 *   GET /:container/:resource
 */

exports.handler = (event, context, callback) => {
    const resource = event['resource'];
    ddb.get({
        TableName: process.env.TABLE_NAME,
        Key: {
            "@id": resource
        },
    }, (err, data) => {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, data.Item);
        }
    });
};
