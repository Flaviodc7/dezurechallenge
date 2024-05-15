import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendPromptDTO } from 'src/infra/dtos/prompts.dto';
import { OpenAIChat } from 'langchain/llms/openai';
import { BufferMemory } from 'langchain/memory';
import { LLMChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PromptsService {
  constructor(private readonly configService: ConfigService) {}

  
  async send(payload: SendPromptDTO) {
    const AI_TEMPERATURE = 0.9;
    const memory = new BufferMemory({ memoryKey: 'chat_history' });

    const model = new OpenAIChat({ 
      temperature: this.configService.get<number>('OPENAI_TEMPERATURE', AI_TEMPERATURE)
    });

    const template = `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. The AI answers as Yoda.
    Current conversation:
    {chat_history}
    Human: {input}
    AI:`;

    const prompt = PromptTemplate.fromTemplate(template);

    const chain = new LLMChain({ llm: model, prompt, memory });

    try {
      const res = await chain.call({ input: payload.prompt });
      return res;
    } catch (error) {
      throw new InternalServerErrorException('Failed to process the prompt');
    }
  }
}