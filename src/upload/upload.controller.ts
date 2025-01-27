/* eslint-disable prettier/prettier */
import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {

    constructor(private configService:ConfigService,private uploadService:UploadService){

    }


    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile(new ParseFilePipe({

        validators:[ new MaxFileSizeValidator({maxSize: 10 * 1024 * 1024}), new FileTypeValidator({fileType:'image/jpeg'})] // 2 MB 

    })) file:Express.Multer.File){

      

      const resp = await this.uploadService.upload(file.originalname,file.buffer);

      console.log(resp);
        
    }


}
