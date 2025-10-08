let http = require('http');
const fs = require("node:fs");
const url = require("url");
const mime = require('mime-types')

const server = http.createServer(function (req, res) {

    switch (req.url.split('?')[0]) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain ; charset=UTF-8'});
            res.write('Strona główna!');
            res.end();
            break;
        case '/1':
            res.writeHead(200, {'Content-Type': 'text/json'});
            const obj = {
                imie : "jan",
                nazwisko : "kowalski"
            }
            res.end(JSON.stringify(obj));
            break;
        case '/2':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1>Strona Trzecia</h1>');
            break;
        case '/3':
            res.writeHead(200, {'Content-Type': 'text/html'});
            try {
                const data = fs.readFileSync('/home/filip/Desktop/webowki/2025_09_24/index.html', 'utf8');
                console.log(data);
                res.end(data)

            } catch (err) {
                console.error(err);
                res.end(err);
            }
            break;
        case '/getparams':
            const parsedURL = url.parse(req.url, true);
            console.log(parsedURL);
            const query = parsedURL.query;
            try{
                const timestamp = Date.now();
                const filename = `params_${timestamp}.json`;
                fs.writeFileSync(filename, JSON.stringify(query, null, 2), "utf-8");
                console.log('file created successfully')
            }
            catch(err){
                console.error('error while saving file: ',err);
            }
            const ok = {ok: 'ok'}
            res.end(JSON.stringify(ok));
            break;
        default:
            const filePath = `assets/${req.url}`;
            const mimeType = mime.lookup(filePath);

            if (!mimeType) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `Pathname ${req.url} not found!` }));
                return;
            }

            try {
                const data = fs.readFileSync(filePath);
                res.writeHead(200, { 'Content-Type': mimeType });
                res.end(data);
            } catch (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `Pathname 'assets/${req.url}' not found!` }));
            }
            break;

    }

})
server.listen(3000 ,()=>{
    console.log('Server started on http://127.0.0.1:3000')
});