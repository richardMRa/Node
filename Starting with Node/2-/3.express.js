const express = require('express')
const pokesample = require('./pokesample/pokemon.json')
const app = express()
const PORT = process.env.PORT ?? 3000

app.disable('x-powered-by') //Disables x-powered-by header 


//"Middleware" this is exectued for every request before reaching its corresponding function
app.use(express.json()) //express native middleware does the same as below
/*
app.use((req, res, next) => {
    if (req.method !== 'POST') return next()
    if (req.header('content-type') !== 'application/json') return next()

    let body = ''

    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        req.body = data
        next()
    })


})
*/

app.get('/', (req, res) => {
    res.send('<h1> Home con express </h1>')
})

app.post('/pokesample', (req, res) => {
    /*
    let body = ''
    //Listen Data event
    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        res.status(201).json(data)
    })
    this code was moved to "use"
    */
    res.status(201).json(req.body)
})

app.use((req, res) => {
    res.status(404).send('<h1> 404 :/ <h1>')
})

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`)
})