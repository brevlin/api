import { Module } from '@nestjs/common';
import { AwsSDK } from './sdk';

@Module({
    providers:[AwsSDK],
    exports:[AwsSDK]
})
export class SdkModule {}
