import express from 'express'
import { client } from '../database'
const userRouter = express.Router()
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { User } from '../interfaces';

dotenv.config();

userRouter.post('/sign-in', async (req, res) => {
	try {		
  const { username, password } = req.body;

  await client.connect();
  const users = client.db("database").collection("users");
  const user: User | null = await users.findOne({ username });
  
  if (user && user.password === password) {
    const token = jwt.sign({username}, process.env.JWT_SECRET!);
    return res.status(200).json({ success: true, token });
  }

  if (!user) return res.status(404).json({ message: 'user not found' });

  return res.status(401).json({ message: 'invalid credentials' });
	} catch (error) {
		return res.status(500).json({ message: 'unexpected internal server error', fullError: error })
	}
})

userRouter.post('/sign-up', async (req, res) => {
	try {		
  const { username, name, password } = req.body;

  await client.connect();
  const db = client.db("database")
  const users = db.collection("users")
  const usernames = await db.collection("usernames").find({}).toArray();

  let duplicatedUsernames = false;
  usernames.forEach(uname => {
    if (uname.name === username) duplicatedUsernames = true;
  })
  if (duplicatedUsernames) return res.status(409).json({ message: 'duplicated username' });

  await db.collection("usernames").insertOne({ name: username });

  const newUser: User = {
    name,
    username,
    password,
    transactions: [],
    accounts: []
  }

  await users.insertOne(newUser);
  await client.close();

  const token = jwt.sign({username}, process.env.JWT_SECRET!);

  return res.status(200).json({ success: true, token });
	} catch (error) {
		return res.status(500).json({ message: 'unexpected internal server error', fullError: error })
	}
})

userRouter.delete('/', async (req, res) => {
	try {		
  const { username, password } = req.body;

  await client.connect();
  const users = client.db("database").collection("users");
  await users.deleteOne({ username, password });
  await client.db("database").collection("usernames").deleteOne({ name: username });

  return res.json(({ success: true }));
	} catch (error) {
		return res.status(500).json({ message: 'unexpected internal server error', fullError: error })
	}
})

export default userRouter;