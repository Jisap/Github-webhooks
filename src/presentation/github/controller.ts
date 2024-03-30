import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { before } from "node:test";
import { DiscordService } from "../services/discord.service";



export class GithubController {

  constructor(
    private readonly githubService = new GithubService(),  // Creación de una instancia por defecto 
    private readonly discorService = new DiscordService(),
  ){}

  webhookHandler = (req:Request, res: Response) => {

    const githubEvent = req.header('x-github-event') ?? 'unknown';
    const signature = req.header('x-hub-signature-256') ?? 'unknown'
    const payload = req.body;

    let message:string;

    switch( githubEvent ){
      case 'star':
        message = this.githubService.onStar(payload)
      break;

      case 'issues':
        message = this.githubService.onIssue(payload)
      break

      default:
        message = `Unknown event ${githubEvent}`
    }
  
    this.discorService.notify(message)
      .then(() => res.status(202).send('Accepted'))
      .catch(() => res.status(500).json({error: 'Internal server error'}))

    
  }
}