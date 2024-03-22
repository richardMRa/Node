import express from "express";
import { moviesRouter } from "./routes/moviesRoutes.js";
const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.disable('x-powered-by')

app.use('/movies', moviesRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        "Endpoints": {
            "movies": "/movies"
        }

    })
})

app.use((req, res) => {
    res.status(404).send('<h1> 404 :/ <h1>')
})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})