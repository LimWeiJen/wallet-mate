import express from 'express'
import { client } from '../database'
const accountRouter = express.Router()
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { Account, User } from '../interfaces';

dotenv.config();

accountRouter.use((req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1];
  	if (!token) return res.status(401).json({ message: 'invalid or missing token' });

	jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    		if (err) return res.status(500).json({ message: 'unable to verify user by the token given' });
		req.body.decoded = decoded;
		next()
	})
})

accountRouter.get('/', async (req, res) => {
	const username = req.body.decoded.username;
  	if (!username) return res.status(500).json({ message: 'unable to authorize user' });

	await client.connect();
	const db = client.db("database").collection("users");

	const user: User | null = await db.findOne({ username });

  	if (!user) return res.status(500).json({ message: 'unable to locate user in the database' });

	const accounts = user.accounts;

	await client.close();
	return res.json({success: true, accounts});
})

accountRouter.post('/', async (req, res) => {
	const username = req.body.decoded.username;
	const account: Account = req.body.account;

	if (!account) return res.json({ success: false, status: 400})
  	if (!username) return res.status(500).json({ message: 'unable to authorize user' });

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

	if (!account) return res.status(400).json({ message: 'missing or invalid account object' }) 
  	if (!username) return res.status(500).json({ message: 'unable to authorize user' });
	
	await client.connect();
	const db = client.db("database").collection("users");
	
	const user: User | null = await db.findOne({ username });
	const accounts = user?.accounts;
	if (!accounts) return res.status(500).json({ message: 'cannot find accounts object in user object' })
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
  	if (!username) return res.status(500).json({ message: 'unable to authorize user' });

	await client.connect();
	const db = client.db("database").collection("users");
	const user: User | null = await db.findOne({username});

  	if (!user) return res.status(500).json({ message: 'unable to locate user in the database' });

	let accounts = user.accounts;

	if (!accounts) return res.status(500).json({ message: 'cannot find accounts object in user object' })

	accounts.splice(accountIndex, 1);

	await db.updateOne({_id: user._id}, {$set: { accounts }});

	return res.json({ success: true });
})

export default accountRouter