import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { before } from "node:test";



export class GithubController {

  constructor(
    private readonly githubService = new GithubService()  // Creación de una instancia por defecto 
  ){}

  webhookHandler = (req:Request, res: Response) => {

    const githubEvent = req.header('x-github-event') ?? 'unknown';
    const signature = req.header('x-hub-signature-256') ?? 'unknown'
    const payload = req.body;

    switch( githubEvent ){
      case 'star':
        this.githubService.onStar(payload)
      break;

      default:
        console.log(`Unknown event ${githubEvent}`)
    }

    res.status(202).send('Accepted')
  }
}