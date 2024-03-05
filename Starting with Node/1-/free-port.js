import net from 'node:net'

function findAvailablePort(desiredPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer()
        server.listen(desiredPort, () => {
            const { port } = server.address()
            server.close(() => {
                resolve(port)
            })
        })

        server.on('Error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(0).then(port => resolve(port))
            } else {
                reject(err)
            }
        })
    })

}

export { findAvailablePort }
