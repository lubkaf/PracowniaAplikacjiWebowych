import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', async (req, res) => {
  const filePath = path.join(__dirname, `htmls/index.html`);
  try{
    res.status(200).sendFile(filePath);
  }
  catch(err){
    res.status(500).send('Error while reading index.html');
    console.log(err);
  }
})

app.get('/o-nas', async (req, res) => {
  const filePath = path.join(__dirname, `htmls/onas.html`);
  try{
    res.status(200).sendFile(filePath);
  }
  catch(err){
    res.status(500).send('Error while reading onas.html');
    console.log(err);
  }
})

app.get('/oferta', async (req, res) => {
  const filePath = path.join(__dirname, `htmls/onas.html`);
  try{
    res.status(200).sendFile(filePath);
  }
  catch(err){
    res.status(500).send('Error while reading onas.html');
    console.log(err);
  }
})

app.get('/kontakt', async (req, res) => {
  const filePath = path.join(__dirname, `htmls/kontakt.html`);
  try{
    res.status(200).sendFile(filePath);
  }
  catch(err){
    res.status(500).send('Error while reading kontakt.html');
    console.log(err);
  }})

app.get('*', (req, res) => {
  res.status(404).send('Not Found')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
