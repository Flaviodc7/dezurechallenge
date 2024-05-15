import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendPromptDTO } from 'src/infra/dtos/prompts.dto';

@ApiTags('Prompt Langchain')
@Controller('prompts')
export class PromptsController {
    promptService: any;

    @ApiOperation({ summary: 'Enviar un Prompt a realizar a ChatGPT mediante Langchain' })
    @Post()
    send(@Body() payload: SendPromptDTO) {
      return this.promptService.send(payload);
    }
}
