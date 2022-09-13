import * as dotenv from 'dotenv';
dotenv.config()

import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import { createContext } from './router/createRouter';
import { appRouter } from './router';


const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use((req, _res, next) => {
  // request logger
  console.log('⬅️ ', req.method, req.path, req.body ?? req.query);
  next();
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/", (req, res) => {
  res.send("hiho");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
