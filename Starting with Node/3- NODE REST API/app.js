const express = require('express')
const app = express()
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')



const PORT = process.env.PORT ?? 3000
app.disable('x-powered-by')
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' })
})


//Movie resources => /movie endpoint

// GET ALL MOVIES
app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')

    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }

    res.json(movies)
})
//  GET MOVIES BY ID
app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: "404 Not Found :/" })
})

// POST MOVIE
app.post('/movies', (req, res) => {

    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = {
        id: crypto.randomUUID(), //UUID v4
        ...result.data
    }

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

// UPDATE MOVIE BY ID
app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return res.status(400).json({ message: "Movie not found" })

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)


})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})
