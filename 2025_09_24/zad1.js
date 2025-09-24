let http = require('http');

const server = http.createServer(function (req, res) {
    const fs = require('node:fs');

    switch (req.url) {
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
        default:
            res.status = 404;
            res.end('Not Found!');
            break;
    }

})
server.listen(3000 ,()=>{
    console.log('Server started on port 3000')
});