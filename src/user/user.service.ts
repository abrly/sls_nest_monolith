/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DynamoDBClient, QueryCommand, QueryCommandInput } from '@aws-sdk/client-dynamodb';

import { DynamoDBDocumentClient,PutCommand  } from "@aws-sdk/lib-dynamodb";

import { unmarshall } from '@aws-sdk/util-dynamodb';

const client=new DynamoDBClient({region:'us-east-1'});

const docClient = DynamoDBDocumentClient.from(client);

import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class UserService {

   constructor(private configService:ConfigService){}

    async createUser(dto: any): Promise<any> {

        const user = {
          id: uuid(),
          ...dto,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        console.log(`what is my dto` + dto);

        let response;

        try {

              const command= new PutCommand({
                TableName:this.configService.getOrThrow("USERS_TABLE_NAME"),
                Item:user
            });
      
          response = await docClient.send(command);
    
         
        } catch (error) {
          throw new InternalServerErrorException(error);
        }

        
        
          return {

            user:{...user,requestId:response?.requestId},
            
         };

      

      }


      async getUserById(id: string): Promise<any> {
        let user;

        try {

          const params: QueryCommandInput = {
            TableName: this.configService.getOrThrow("USERS_TABLE_NAME"),
            KeyConditionExpression: "#usrid = :usrid",
            ExpressionAttributeValues: { ":usrid": { S: id } }, 
            ExpressionAttributeNames: { "#usrid": "id" },
            ConsistentRead: false,
          };
      
          const command = new QueryCommand(params);

      
          const response = await docClient.send(command);

          console.log(`what is resp` + response);
      
          
          user = response.Items ? response.Items[0] : null;
      
          if (!user) {
            throw new Error('User not found');
          }
        } catch (error) {
          throw new InternalServerErrorException(error);
        }

        return unmarshall(user);
      }


}
