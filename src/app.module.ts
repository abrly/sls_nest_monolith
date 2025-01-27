/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    
    ConfigModule.forRoot({isGlobal:true}),

   
    ProductModule, 
    UserModule, 
    UploadModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
