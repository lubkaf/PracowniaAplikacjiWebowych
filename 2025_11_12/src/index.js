import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from "url";

import kategoria from '../routes/kategoria.js';
import wpis from '../routes/wpis.js';
import komentarz from '../routes/komentarz.js';

import createLogService from './logService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../.env.example")
});

const app = express();

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db(process.env.MONGO_DB_NAME || "pracownia");

const logService = createLogService(db);

app.use((req, res, next) => {
    req.logService = logService;
    next();
});

app.use(express.json());

// Test
app.get('/', (req, res) => {
    res.json("API działa");
});

// Routery
app.use('/kategoria', kategoria);
app.use('/wpis', wpis);
app.use('/komentarz', komentarz);

app.listen(3000, () => {
    console.log("App is running on http://localhost:3000");
});
