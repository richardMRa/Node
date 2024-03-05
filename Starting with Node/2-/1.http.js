const http = require('node:http')
const fs = require('node:fs')
const port = process.env.PORT ?? 3000

const processRequest = (req, res) => {

    if (req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('Hola mundo en "/" ')
    } else if (req.url === '/gato') {
        fs.readFile('./gato.png', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1> ¡Error! </h1>')
            } else {
                res.setHeader('Content-Type', 'image/png')
                res.end(data)
            }
        })
    } else if (req.url === '/contact') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end('<h1> Contacto </h1>')
    } else {
        res.statusCode = 404
        res.end('<h1>:/ Not found 404</h1>')
    }

}

const server = http.createServer(processRequest)

server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
})