import { GitHubStartPayload } from "../../interfaces";




export class GithubService {

  constructor(){}

  onStar( payload: GitHubStartPayload): string {

    const  { action, sender, repository, starred_at } = payload;
    
    return `User ${sender.login} ${action} star on ${repository.full_name}`
    
  }
}