import { envs } from "../../config";




export class DiscordService {

  private readonly discordWebhookUrl: string = envs.DISCORD_WEBHOOK_URL;

  constructor(){}

  async notify( message: string ){
  
    const body = {
      content: message,
      embeds: [
        {
          image: { url: 'https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
        }
      ]
    }

    const resp = await fetch( this.discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      console.log('Error sending message');
      return false
    }

    return true
  
  }

}