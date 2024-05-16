import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendPromptDTO } from 'src/infra/dtos/prompts.dto';
import { PromptsService } from 'src/infra/services/prompts/prompts.service';

@ApiTags('Prompt Langchain')
@Controller('prompts')
export class PromptsController {
  constructor(private promptService: PromptsService) {}

  @ApiOperation({
    summary: 'Enviar un Prompt a realizar a ChatGPT mediante Langchain',
  })
  @Post()
  send(@Body() payload: SendPromptDTO) {
    return this.promptService.send(payload);
  }
}
