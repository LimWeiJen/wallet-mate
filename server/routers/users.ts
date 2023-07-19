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

userRouter.post('/sign-in', (req, res) => {
})

userRouter.post('/sign-out', (req, res) => {
})

userRouter.post('/sign-up', async (req, res) => {
})

export default userRouter;