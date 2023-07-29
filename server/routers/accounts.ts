import express from 'express'
import { client } from '../database'
const accountRouter = express.Router()
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { Account, User } from '../interfaces';

dotenv.config();

accountRouter.use((req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1];
	if (!token) return res.json({ success: false, status: 401 });

	jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
		if (err) return res.json({success: false, status: 500});
		req.body.decoded = decoded;
		next()
	})
})

accountRouter.get('/', async (req, res) => {
	const username = req.body.decoded.username;
	if (!username) return res.json({ success: false, status: 500 });

	await client.connect();
	const db = client.db("database").collection("users");

	const user: User | null = await db.findOne({ username });

	if (!user) return res.json({ success: false, status: 500 });

	const accounts = user.accounts;

	await client.close();
	return res.json({success: true, accounts});
})

accountRouter.post('/', async (req, res) => {
	const username = req.body.decoded.username;
	const account: Account = req.body.account;

	if (!account) return res.json({ success: false, status: 400})
	if (!username) return res.json({ success: false, status: 500 });

	await client.connect();
	const db = client.db("database").collection("users");

	await db.updateOne({ username }, { $push: { accounts: account }})

	await client.close();
	return res.json({success: true});
})

accountRouter.post('/update', async (req, res) => {
	const username = req.body.decoded.username;
	const account: Account = req.body.account;
	const index = req.body.index;

	if (!account) return res.json({ success: false, status: 400})
	if (!username) return res.json({ success: false, status: 500 });
	
	await client.connect();
	const db = client.db("database").collection("users");
	
	const user: User | null = await db.findOne({ username });
	const accounts = user?.accounts;
	if (!accounts) return res.json({ success: false, status: 500 });
	const newAccounts = [
		...accounts?.slice(0, index),
		account,
		...accounts?.slice(index+1)
	]

	await db.updateOne({ username }, { $set: { accounts: newAccounts }});

	await client.close();

	return res.json({success: true});
})

accountRouter.delete('/', async (req, res) => {
	const username = req.body.decoded.username;
	const accountIndex = req.body.accountIndex;
	if (!username) return res.json({ success: false, status: 500 });

	await client.connect();
	const db = client.db("database").collection("users");
	const user: User | null = await db.findOne({username});

	if (!user) return res.json({ success: false, status: 500 });

	let accounts = user.accounts;

	if (!accounts) return res.json({ success: false, status: 400 });

	accounts.splice(accountIndex, 1);

	await db.updateOne({_id: user._id}, {$set: { accounts }});

	return res.json({ success: true });
})

export default accountRouter