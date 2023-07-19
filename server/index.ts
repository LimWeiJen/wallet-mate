import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { transactionRouter, userRouter } from './routers';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = 3001;

app.use(bodyParser());

app.use('/users', userRouter);
app.use('/transactions', transactionRouter);

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});