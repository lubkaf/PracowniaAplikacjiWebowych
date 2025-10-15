const express = require('express');
const {json} = require("express");
const app = express();
const fs = require("fs");
const PORT = 3000;
const path = require("path");
const url = require("url");
const mime = require("mime-types");
app.get('/', (req, res) => {
    res.status(200).send('Welcome to Zad1');
});

app.get('/2', (req, res) => {
   const obj = {
       imie : "Name",
       nazwisko: "Surname"
   }
   res.status(200).json(obj);
});

app.get('/3', (req, res) => {
    res.status(200).send('<h1>Page 3</h1>');
})

app.get('/4', async (req, res) => {
    const filePath = path.join(__dirname, `index.html`);
    try{
        res.status(200).sendFile(filePath);
    }
    catch(err){
        res.status(500).send('Error while reading index.html');
    }
})
app.get('/get_params', async (req, res) => {
    try{
        const query = req.query;
        const timeStamp = Date.now();
        const fileName = `params_${timeStamp}.json`;
        const filepath = path.join(__dirname, fileName);
        await fs.writeFile(filepath, JSON.stringify(query, null, 2), (err) => {});
        console.log(fileName);

    }
    catch(err){
        res.status(500).send(`error while writing file: ${err.message}` );
    }
    const ok = {"ok": true};
    res.send(JSON.stringify(ok));

})



app.use(express.static(__dirname + '/assets'), (req, res) => {
    res.status(404).json({"error": "Not Found"});
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});