import express from 'express'
import { client } from '../database'
const userRouter = express.Router()
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

// middleware that is specific to this router
userRouter.use((req, res, next) => {
  next()
})

userRouter.post('/sign-in', async (req, res) => {
  const { username, password } = req.body;

  await client.connect();
  const users = client.db("database").collection("users");
  const user = await users.findOne({ username });
  
  if (user && user.password === password) {
    const token = jwt.sign({username}, process.env.JWT_SECRET!);
    return res.status(200).json({ success: true, token });
  }

  if (!user) return res.json({ success: false, status: 404 });

  return res.json({ success: false, status: 401 });
})

userRouter.post('/sign-out', (req, res) => {
})

userRouter.post('/sign-up', async (req, res) => {
  const { username, name, password } = req.body;

  await client.connect();
  const db = client.db("database")
  const users = db.collection("users")
  const usernames = await db.collection("usernames").find({}).toArray();

  let duplicatedUsernames = false;
  usernames.forEach(uname => {
    if (uname.name === username) duplicatedUsernames = true;
  })
  if (duplicatedUsernames) return res.json({ success: false, status: 409 });

  await db.collection("usernames").insertOne({ name: username });
  await users.insertOne({ username, name, password });
  await client.close();

  const token = jwt.sign({username}, process.env.JWT_SECRET!);

  return res.status(200).json({ success: true, token });
})

export default userRouter;