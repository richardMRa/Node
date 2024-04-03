import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config()
const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
app.use(logger('dev'))
app.use(express.static('public'))

const io = new Server(server, {
    connectionStateRecovery: {}
})

const db = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_TOKEN
})

await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT
    )
`)


io.on('connection', async (socket) => {
    console.log('User connected')

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    socket.on('chat message', async (msg) => {
        let result
        try {
            result = await db.execute({
                sql: 'INSERT INTO messages (content) VALUES (:msg);',
                args: { msg }
            })
        } catch (e) {
            console.error(e)
            return
        }

        io.emit('chat message', msg, result.lastInsertRowid.toString())
    })

    if (!socket.recovered) {
        try {
            const results = await db.execute({
                sql: 'SELECT id, content FROM messages WHERE id > ?',
                args: [socket.handshake.auth.serverOffset ?? 0]
            })

            results.rows.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString())
            })
        } catch (e) {

        }
    }
})


server.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})