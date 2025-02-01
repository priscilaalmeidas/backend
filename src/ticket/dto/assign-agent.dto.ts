/* eslint-disable prettier/prettier */
import { IsMongoId } from 'class-validator';

export class AssignAgentDto {
  @IsMongoId()
  agent: string;
}
