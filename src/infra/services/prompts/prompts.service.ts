import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendPromptDTO } from 'src/infra/dtos/prompts.dto';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";


@Injectable()
export class PromptsService {
  async send(payload: SendPromptDTO) {

    const template = `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know. The AI answers as Yoda.
    Current conversation:
    {chat_history}
    Human: {input}
    AI:`;

    const prompt = ChatPromptTemplate.fromTemplate(template);

    const llm = new ChatOpenAI();

    const chain = prompt.pipe(llm);

    try {
      const res = await chain.invoke({
        adjective: "funny",
        chat_history: '',
        input: payload.prompt
      });
      return res;
    } catch (error) {
      throw new InternalServerErrorException('Failed to process the prompt');
    }
  }
}
