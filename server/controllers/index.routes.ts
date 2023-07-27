import express, { Request, Response, Router } from 'express';
import path from 'path';

const indexController: Router = express.Router();

indexController.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/markup/login.html"));
});

indexController.get("/game", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/markup/game.html"));
});

indexController.get("/scores", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/markup/scores.html"));
});

export default indexController;
