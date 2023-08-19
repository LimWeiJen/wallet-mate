import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { transactionRouter, userRouter, accountRouter } from './routers';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = 3001;

app.use(bodyParser());
app.use(cors());

app.use('/users', userRouter);
app.use('/transactions', transactionRouter);
app.use('/accounts', accountRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

export const server = app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});