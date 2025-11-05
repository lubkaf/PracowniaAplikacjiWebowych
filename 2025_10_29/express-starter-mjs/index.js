import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({ extended: true }))
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '2025_11_05'
})
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database")

})

app.get('/', async (req, res) => {
  const filePath = path.join(__dirname, `htmls/index.html`)
  try{
    res.status(200).sendFile(filePath)
  }
  catch(err){
    res.status(500).send('Error while reading index.html')
    console.log(err)
  }
})

app.get('/o-nas', async (req, res) => {
  const filePath = path.join(__dirname, `htmls/onas.html`)
  try{
    res.status(200).sendFile(filePath)
  }
  catch(err){
    res.status(500).send('Error while reading onas.html')
    console.log(err)
  }
})

app.get('/oferta', async (req, res) => {
  const filePath = path.join(__dirname, `htmls/oferta.html`)
  try{
    res.status(200).sendFile(filePath)
  }
  catch(err){
    res.status(500).send('Error while reading pferta.html')
    console.log(err)
  }
})

app.get('/kontakt', async (req, res) => {
  const filePath = path.join(__dirname, `htmls/kontakt.html`);
  try{
    res.status(200).sendFile(filePath)
  }
  catch(err){
    res.status(500).send('Error while reading kontakt.html');
    console.log(err)
  }
})

app.post('/kontakt', async (req, res) => {
  const { imie, nazwisko, email, wiadomosc } = req.body
  console.log(imie)
  console.log(nazwisko)
  console.log(email)
  console.log(wiadomosc)

  const sql = "INSERT INTO messages (wiadomosc) VALUES (?)";
  con.query(sql, [wiadomosc], (err, result) => {
    if (err) throw err
    console.log("✅ Wstawiono rekord ID:", result.insertId)
  })

  res.redirect('/')
})


app.get('/api/contact-messages', async (req, res) => {
    con.query("SELECT * FROM messages", function (err, result, fields) {
      if (err) throw err
      console.log(result)
      res.json(result);
    })
})

app.get('/api/contact-messages/:id', async (req, res) => {
    const id = parseInt(req.params.id)
  console.log(id)
    if(isNaN(id)){
      console.log(`Podane id: ${id} nie istnieje`)
      res.redirect('/*');
      return;
    }
    const sql = `SELECT * FROM messages WHERE id= ?`;
    con.query(sql, [id], (err, result) => {
      if (err) throw err
      if (result.length === 0) {
        console.log(`Podane id: ${id} nie istnieje`);
        res.redirect('/*');
        return;
      }
      res.json(result)
    })
})

app.get('*', (req, res) => {
  res.status(404).send('Not Found')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
