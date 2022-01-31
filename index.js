const {generateFileKey, getFileName, getS3SignedUrl} = require('./helper')

module.exports.handler = async () => {
    const key = generateFileKey()
    const fileName = getFileName(key)
    const url = await getS3SignedUrl(fileName);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({key, url, fileName})
    };
}
module.exports.handler()