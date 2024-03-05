import http from 'node:http'
import { findAvailablePort } from './free-port.js'



const server = http.createServer((req, res) => {
    console.log('request received')
    res.end('hola mundo')
})

findAvailablePort(2000).then(port => {
    server.listen(port, () => {
        console.log(`Server listening on port http://localhost:${port}`)
    })
})