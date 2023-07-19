import express from 'express'
import { client } from '../database'
const transactionRouter = express.Router()

// middleware that is specific to this router
transactionRouter.use((req, res, next) => {
  next()
})

transactionRouter.post('/', async (req, res) => {
  await client.connect();
  const db = client.db("database").collection("users")
})

transactionRouter.get('/', (req, res) => {
})

transactionRouter.delete('/', (req, res) => {
})

export default transactionRouter;