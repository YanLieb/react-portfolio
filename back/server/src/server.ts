import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';

import { mongoConnect } from './services/mongo';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} : http://localhost:${PORT}`)
  })
}

startServer();