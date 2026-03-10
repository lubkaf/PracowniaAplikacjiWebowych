import 'dotenv/config';
import express, { Express } from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { kategoriaRouter } from './routes/kategoria/kategoria_router'
import { komentarzRouter } from './routes/komentarz/komentarz_router'
import { wpisRouter } from './routes/wpis/wpis_router'

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app: Express = express()

app.get('/', (req, res) => {
  res.send('Strona główna');
});
app.use(express.json())
app.use('/kategoria', kategoriaRouter)
app.use('/komentarz', komentarzRouter)
app.use('/wpis', wpisRouter)
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
