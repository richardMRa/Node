const express = require('express')
const pokesample = require('./pokesample/pokemon.json')
const app = express()
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by') //Disables x-powered-by header 


//Middleware
//All requests pass here before 
app.use((req, res, next) => {
    console.log('primer middleware')

    next()
})

app.get('/', (req, res) => {
    res.send('<h1> Home con express </h1>')
})

app.post('/pokesample', (req, res) => {
    let body = ''
    //Listen Data event
    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        res.status(201).json(data)
    })
})

app.use((req, res) => {
    res.status(404).send('<h1> 404 :/ <h1>')
})

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`)
})