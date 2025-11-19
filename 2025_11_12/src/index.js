import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

const app = express()
//import { PrismaClient } from '../generated/prisma/client'
dotenv.config({ path: path.resolve('../.env.example') });
console.log(process.env.DATABASE_URL);

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
