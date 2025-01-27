/* eslint-disable prettier/prettier */
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {

    
    constructor(private configService:ConfigService){

    }
 
    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('APP_AWS_REGION')
    });
    

    async upload(fileName:string,file:Buffer){
        await this.s3Client.send(

            new PutObjectCommand({
                Bucket:this.configService.getOrThrow("APP_FILESTORE_S3_BKT"),
                Key:fileName,
                Body:file
            })

        );
    }



}
