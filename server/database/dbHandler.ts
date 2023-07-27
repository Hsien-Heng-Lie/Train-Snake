const { sql, poolPromise } = require('./dbService');
import { Player } from '../models/Player';
import { GameLog } from '../models/GameLog';

export async function upsertUser(userName: string) {
  const pool = await poolPromise
  const result = await pool.request()
      .input('UserName', sql.String, userName)
      .execute('UpsertUser');     
  const player = new Player(result.recordset[0].UserName,result.recordset[0].highScore);
  return player;
}

export async function insertGameLog(userName: string, score: number) {
  const pool = await poolPromise
  const result = await pool.request()
      .input('UserName', sql.String, userName)
      .input('Score', sql.Int, score)
      .execute('InsertGameLog');
  return result;
}

export async function getHighScores() {
  const pool = await poolPromise
  const result = await pool.request()
      .execute('GetHighScores');
  return result;
}
