import express from 'express'
import { client } from '../database'
const transactionRouter = express.Router()
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { Transaction, User } from '../interfaces';

dotenv.config();


// middleware that is specific to this router
transactionRouter.use((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'invalid or missing token' });

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'unable to verify user by the token given' });
    req.body.decoded = decoded;
    next()
  })
})

transactionRouter.post('/', async (req, res) => {
  const username = req.body.decoded.username;
  const transaction: Transaction = req.body.transaction;

  if (!transaction) return res.status(400).json({ message: 'missing or invalid transaction object' })
  if (!username) return res.status(500).json({ message: 'unable to authorize user' });

  await client.connect();
  const db = client.db("database").collection("users");

  await db.updateOne({ username }, { $push: {
    transactions: transaction
  }});

  await client.close();

  return res.json({success: true});
})

transactionRouter.get('/', async (req, res) => {
  const username = req.body.decoded.username;
  if (!username) return res.status(500).json({ message: 'unable to authorize user from the JWT token' });

  await client.connect();
  const db = client.db("database").collection("users");
  const user: User | null = await db.findOne({username});

  if (!user) return res.status(500).json({ message: 'unable to locate user in the database' });

  return res.json({ success: true, transactions: user.transactions });
})

transactionRouter.delete('/', async (req, res) => {
  const username = req.body.decoded.username;
  const transactionIndex = req.body.transactionIndex;
  if (!username) return res.status(500).json({ message: 'unable to authorize user from the JWT token' });

  await client.connect();
  const db = client.db("database").collection("users");
  const user: User | null = await db.findOne({username});

  if (!user) return res.status(500).json({ message: 'unable to locate user in the database' });

  let transactions = user.transactions;

  if (!transactions) return res.status(500).json({ message: 'cannot find transaction object in the user object' });

  transactions.splice(transactionIndex, 1);

  await db.updateOne({_id: user._id}, {$set: {transactions}});

  return res.json({ success: true });
})

export default transactionRouter;