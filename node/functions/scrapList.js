const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const ddb = new AWS.DynamoDB.DocumentClient();

const list = (event, context, callback) => {
    const params = {
        TableName: 'websites',
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
                "@id": `https://76qbahw4n7.execute-api.us-east-1.amazonaws.com/v1/scraps/`,
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

list(null, null, (err, result) => {
    if (err) console.error(err);
    else console.log('result', result);
})
