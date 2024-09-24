import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '../supabase/supabaseClient';
import { SupabaseClient as SupabaseClientType } from "@supabase/supabase-js";
import { AwsSDK } from './sdk';
import fs from 'fs';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'

@Injectable()
export class StorageService {
    private readonly supabase: SupabaseClientType;

    constructor(private readonly supabaseClient: SupabaseClient) {
        this.supabase = supabaseClient.getInstance();
    }

    async uploadPFP(path: string) {
        try {
            const client = new AwsSDK().getInstance();

            const file = fs.createReadStream(path);

            const command = new PutObjectCommand({
                Bucket: process.env.bucket_name,
                Key: `${path}`,
                Body: file,
                ContentType: 'image/png',
            });

            await client.send(command);
            return true;
        } catch (error) {
            return false;
        }
    }

    async fetchPFP(path: string) {
        try {
            const client = new AwsSDK().getInstance();

            const command = new GetObjectCommand({
                Bucket: process.env.bucket_name,
                Key: `${path}`
            });

            const { Body } = await client.send(command);

            return Body;
        } catch (error) {
            return false
        }
    }
}