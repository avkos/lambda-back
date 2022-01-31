const config = require('./config');
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');
const {v4} = require("uuid");

const s3 = new S3Client({
    signatureVersion: 'v4',
    region: config.REGION
});

const getFileName = (key) => `${key}.jpg`;

const generateFileKey = () => {
    return v4()
}
const S3PutObjectCommand = (Key) => {
    return new PutObjectCommand({
        ACL: 'public-read',
        Bucket: config.S3_BUCKET,
        Key,
    });
}
const getS3SignedUrl = (name) => {
    const command = S3PutObjectCommand(name)
    return getSignedUrl(s3, command, {expiresIn: 600})
}

module.exports = {
    getFileName,
    generateFileKey,
    getS3SignedUrl
}