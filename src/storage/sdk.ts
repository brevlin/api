import { Injectable } from "@nestjs/common";
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsSDK {
    private client: S3Client;

    constructor() {
        this.client = new S3Client({
            forcePathStyle: true,
            endpoint: process.env.endpoint_url,
            region: process.env.region,
            credentials: {
              accessKeyId: process.env.aws_access_key_id,
              secretAccessKey: process.env.aws_secret_access_key,
            }
        });
    }

    getInstance() {
        return this.client;
    }
}
