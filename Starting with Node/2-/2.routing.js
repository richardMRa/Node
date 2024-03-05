const http = require('node:http')
const charizardJson = require('./pokesample/pokemon.json')
const port = process.env.PORT ?? 3000

const processRequest = (req, res) => {

    const { method, url } = req

    switch (method) {
        case 'GET':
            switch (url) {
                case '/':
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>Home</h2>')
                case '/pokeSample/charizard':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(charizardJson))
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1> 404 :/ </h1>')
            }
        case 'POST':
            switch (url) {
                case '/pokeSample': {
                    let body = ''
                    //Hay que escuchar evento Data
                    req.on('data', chunk => {
                        body += chunk.toString()
                    })

                    req.on('end', () => {
                        const data = JSON.parse(body)
                        res.writeHead(201,
                            {
                                'Content-Type': 'application/json; charset=utf-8'
                            })
                        res.end(JSON.stringify(data))
                    })

                    break;
                }
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1> 404 :/ </h1>')
            }
    }
}

const server = http.createServer(processRequest)

server.listen(port, () => {
    console.log(`Server listening on port htpp://localhost:${port}`);
})
