import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendPromptDTO {
  @ApiProperty({
    description: 'Prompt a realizar a ChatGPT mediante Langchain',
  })
  @IsString()
  @IsNotEmpty()
  readonly prompt: string;
}
