import { WebClient } from 'https://deno.land/x/slack_web_api@6.7.2/mod.js';
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

import type { Database } from "../../../types/supabase.ts";

const slackBotToken = Deno.env.get('SLACK_TOKEN') ?? ''
const botClient = new WebClient(slackBotToken)
const supabase_url = Deno.env.get("SUPABASE_URL") ?? "";
const service_role = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient<Database>(supabase_url, service_role);

console.log(`Slack URL verification function up and running!`)

Deno.serve(async (req) => {
  try {
    const reqBody = await req.json()
    console.log(JSON.stringify(reqBody, null, 2))
    const { challenge, type, event } = reqBody

    if (type == 'url_verification') {
      return new Response(JSON.stringify({ challenge }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    } else if (event.type == 'app_mention') {
      const { user, text, channel, ts } = event
      
      // Here you should process the text received and return a response:
      const response = await botClient.chat.postMessage({
        channel: channel,
        text: '🤔',
        ts,
      })
      
      const { error } = await supabase.from('job_queue').insert({
        http_verb: 'POST',
        payload: { user, text, channel: response.channel, ts: response.ts },
        retry_limit: 1,
      })

      if (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      return new Response('ok', { status: 200 })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }

  return new Response('Unhandled request', { status: 400 });
})