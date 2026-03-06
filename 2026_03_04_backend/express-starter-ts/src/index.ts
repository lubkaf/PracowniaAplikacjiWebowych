import express, { Express } from 'express'
import { kategoriaRouter } from './routes/kategoria/kategoria_router'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/kategoria', kategoriaRouter)
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
