/* eslint-disable prettier/prettier */
import { Controller,Get } from '@nestjs/common';

@Controller('product')
export class ProductController {

    @Get('/')
      getHello(): string {
        return "this is product"
      }


}
