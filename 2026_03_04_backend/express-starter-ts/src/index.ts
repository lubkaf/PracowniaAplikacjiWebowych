import 'dotenv/config';
import express, { Express } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { kategoriaRouter } from './routes/kategoria/kategoria_router'
import { komentarzRouter } from './routes/komentarz/komentarz_router'


dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app: Express = express()
console.log("Ładowanie bazy z URL:", process.env.DATABASE_URL);


app.get('/', (req, res) => {
  res.send('Serwer działa! To jest strona główna.');
});
app.use(express.json())
app.use('/kategoria', kategoriaRouter)
app.use('/komentarz', komentarzRouter)
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
