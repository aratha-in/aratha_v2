import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const endpoint = process.env.AWS_ENDPOINT_URL_S3 || 'https://br-rough-butterfly-bet3bhql.storage.c-9.us-east-2.aws.neon.tech';
const region = process.env.AWS_REGION || 'us-east-2';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'nak_live_4f82431c45ef40d291e2adca6a563667';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || 'nsk_live_197febae23b175ed17125a039e1216cb1efc49ba04adae2ceb6bfc8d3486c6db';
const bucket = 'assets';

const client = new S3Client({
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true,
});

const mediaDir = path.resolve('public/media');
if (!fs.existsSync(mediaDir)) {
  console.log('No public/media directory found.');
  process.exit(0);
}

const files = fs.readdirSync(mediaDir);

for (const file of files) {
  const filePath = path.join(mediaDir, file);
  if (fs.statSync(filePath).isDirectory()) continue;

  const content = fs.readFileSync(filePath);
  let contentType = 'application/octet-stream';
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) contentType = 'image/jpeg';
  else if (file.endsWith('.png')) contentType = 'image/png';
  else if (file.endsWith('.webp')) contentType = 'image/webp';
  else if (file.endsWith('.svg')) contentType = 'image/svg+xml';
  else if (file.startsWith('ATD')) contentType = 'image/jpeg';
  else if (file.startsWith('Aratha') || file.startsWith('ATC')) contentType = 'image/png';

  console.log(`Uploading ${file} (${contentType})...`);
  try {
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: file,
      Body: content,
      ContentType: contentType,
    }));
    console.log(`Uploaded ${file} successfully!`);
  } catch (err) {
    console.error(`Failed to upload ${file}:`, err);
  }
}
