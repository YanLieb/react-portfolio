import path from 'path';
import express from "express";
import type { Request, Response } from "express";
import projectRouter from './routes/project.router';
import {mongoConnect, mongoDisconnect} from './services/mongo';

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')))

app.use(express.json());

app.get('/project', (req: Request, res: Response) => {
  res.render('project')
})

app.use('/project', projectRouter)

mongoConnect();

app.listen(port, () => {
  console.log(`Listening on port ${port} : http://localhost:${port}/`);
})