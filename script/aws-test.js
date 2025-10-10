const dotenv = require('dotenv');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const { parsed: config } = dotenv.config({ path: path.resolve(__dirname, '../env/aws.local.env') });

async function main() {
    console.log('config',config);
    console.log('config.AWS_REGION',config.AWS_REGION);
    console.log('config.AWS_ACCESS_KEY_ID',config.AWS_ACCESS_KEY_ID);
    console.log('config.AWS_SECRET_ACCESS_KEY',config.AWS_SECRET_ACCESS_KEY);
    console.log('config.S3_BUCKET',config.S3_BUCKET);

    const s3Client = new S3Client({
        region: config.AWS_REGION,
        credentials: {
            accessKeyId: config.AWS_ACCESS_KEY_ID,
            secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        },
    });

    await s3Client.send(new PutObjectCommand({
        Bucket: config.S3_BUCKET,
        Key: 'test.txt',
        Body: 'Hello, world!!',
    })).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.error(error);
    });
}

main();