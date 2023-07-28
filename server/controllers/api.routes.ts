import express, { Request, Response, Router } from 'express';
import path from 'path';
import { upsertUser, getHighScores, insertGameLog } from '../database/dbHandler';
import { Console } from 'console';

const apiController: Router = express.Router();

apiController.get("/api/player", async (req: Request, res: Response) => {
  let username:string = req.headers['username']?.toString() + "";
  let player = await upsertUser(username);
  res.json({
    player
  });
});

apiController.get("/api/scoreboard", async (req: Request, res: Response) => {
  let scores = await getHighScores();
  console.log(scores);
  res.json({
    scores
  });
});

apiController.post("/api/scores", async (req: Request, res: Response) => {
  try{
    let username:string = req.body['username']?.toString() + "";
    let score:number = Number(req.body['score']?.toString());
    let result = await insertGameLog(username, score);
    return res.sendStatus(200);
  }
  catch{
    return res.sendStatus(500);
  }
});


export default apiController;