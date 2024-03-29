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

    let message:string;

    switch( githubEvent ){
      case 'star':
        message = this.githubService.onStar(payload)
      break;

      default:
        message = `Unknown event ${githubEvent}`
    }

    console.log({ message })

    res.status(202).send('Accepted')
  }
}