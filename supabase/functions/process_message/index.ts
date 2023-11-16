// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { WebClient } from "https://deno.land/x/slack_web_api@6.7.2/mod.js";
import OpenAI from "https://deno.land/x/openai@v4.16.1/mod.ts";

const slack_bot_token = Deno.env.get("SLACK_TOKEN")!;
const openai_api_key = Deno.env.get("OPENAI_API_KEY")!;
const bot_client = new WebClient(slack_bot_token);
const openai = new OpenAI({
  apiKey: openai_api_key,
})

const createJiraTicket = ({ summary, description, issueType }: { summary: string, description: string, issueType: 'FEATURE' | 'BUG' }) => {
  return {
    followUpPrompt: 'Please display the created ticket to the user. Always answer in markdown format. You can use the following template:\n\n> *Ticket created*\n> \n*Summary:*\n {{summary}}\n> \n*Description:*\n {{description}}\n> \n*Issue type:*\n {{issueType}}\n>\n*What would you like to do next?*',
    ticket: {
      summary,
      description,
      issueType,
      team: 'Tracker'
    },
  }
}

const functions = [
  {
    name: 'create_ticket',
    description: 'Create a support ticket based on the information provided by the user. Only include relevant information in the ticket.',
    parameters: {
      type: 'object',
      properties: {
        summary: {
          type: 'string',
          description: 'The summary of the ticket.',
        },
        description: {
          type: 'string',
          description: 'The description of the ticket.',
        },
        issueType: {
          type: 'string',
          description: 'The type of ticket to create.',
          enum: ['FEATURE', 'BUG'],
        },
      },
    },
    function: createJiraTicket,
    parse: JSON.parse,
  }
]

serve(async (req) => {
  const payload = await req.json();
  const { channel, ts, user, text } = payload;

  try {
    const runner = await openai.beta.chat.completions.runFunctions({
      model: 'gpt-4-1106-preview',
      messages: [
        { role: 'system', content: `You are a helpful DHIS2 Chatbot. Answer in a kind and helpful way.` },
        { role: 'user', content: text }
      ],
      temperature: 0.3,
      stream: false,
      functions,
    })

    const functionReturn = await runner.finalFunctionCallResult();
    console.log(functionReturn);
    const response = await runner.finalChatCompletion();

    await bot_client.chat.postMessage({
      channel,
      ts,
      text: '🤖',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: response.choices[0].message.content,
          }
        },
      ],
    });

    return new Response('ok',
      {
        headers: { "Content-Type": "application/json" },
        status: 200
      },
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
