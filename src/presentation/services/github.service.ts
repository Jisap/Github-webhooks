import { GitHubStartPayload } from "../../interfaces";




export class GithubService {

  constructor(){}

  onStar( payload: GitHubStartPayload): string {
    
    let message:string = '';

    const  { starred_at } = payload;
    console.log(starred_at)

    return message
  }
}