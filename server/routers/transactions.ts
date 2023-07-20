import express from 'express'
import { client } from '../database'
const transactionRouter = express.Router()
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

// middleware that is specific to this router
transactionRouter.use((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.json({ success: false, status: 401 });

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.json({success: false, status: 500});
    req.body.decoded = decoded;
    next()
  })
})

transactionRouter.post('/', async (req, res) => {
  const username = req.body.decoded.username;
  const transaction = req.body.transaction;

  if (!transaction) return res.json({ success: false, status: 400})
  if (!username) return res.json({ success: false, status: 500 });

  await client.connect();
  const db = client.db("database").collection("users");

  await db.updateOne({ username }, { $push: {
    transactions: transaction
  }});

  await client.close();

  return res.json({success: true});
})

transactionRouter.get('/', (req, res) => {
})

transactionRouter.delete('/', (req, res) => {
})

export default transactionRouter;