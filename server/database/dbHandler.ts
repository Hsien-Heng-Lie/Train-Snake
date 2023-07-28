const { sql, poolPromise } = require('./dbService');
import { Player } from '../models/Player';
import { GameLog } from '../models/GameLog';

export async function upsertUser(userName: string) {
  const pool = await poolPromise
  const result = await pool.request()
      .input('UserName', userName)
      .execute('UpsertUser');    
  const player = new Player(result.recordset[0].UserName,result.recordset[0].highScore);
  return player;
}

export async function insertGameLog(userName: string, score: number) {
  const pool = await poolPromise
  const result = await pool.request()
      .input('UserName', userName)
      .input('Score', score)
      .execute('InsertGameLog');
  console.log(score);
  console.log(userName);
  return result;
}

export async function getHighScores() {
  const pool = await poolPromise
  const result = await pool.request()
      .execute('GetHighScores');

  let scores:GameLog[] = []
  for (let i = 0; i < result.recordset.length; i++) {
    scores.push(new GameLog(result.recordset[i].UserName, result.recordset[i].Score));
  }
  return scores;
}
