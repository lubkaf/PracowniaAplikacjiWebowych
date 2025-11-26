import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { MongoClient } from 'mongodb'

dotenv.config({ path: path.resolve('../.env.example') });
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../.env.example")
});
import kategoria from '../routes/kategoria.js';
import wpis from '../routes/wpis.js';
import komentarz from '../routes/komentarz.js';

const app = express()
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db("");

const accessLogger = (req, res, next) => {

    const start = Date.now();
    const logData = {
        timestamp: new Date().toISOString(),
        method: req.method.toUpperCase(),
        url: req.url,
        statusCode: res.statusCode,
        responseTime: Date.now() - start
    }

}

app.use(express.json());
app.get('/', (req, res) => {
    res.json("")
})
app.use('/kategoria', kategoria);
app.use('/wpis', wpis);
app.use('/komentarz', komentarz);

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
