export class Player {
  userName: string;
  highscore: number;
 
  constructor(userName: string, highscore: number) {
    this.userName = userName;
    this.highscore = highscore;
  }
 
  getUserName() {
    return this.userName;
  }

  getHighscore(){
    return this.highscore;
  }
}
 