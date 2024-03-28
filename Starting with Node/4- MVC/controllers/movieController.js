import { readJSON } from '../utils.js'
import { MovieModel } from '../models/local-file-system/movieModel.js'

export class MovieController {
    static async getAll(req, res) {

        res.header('Access-Control-Allow-Origin', '*')
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })

        res.json(movies)


    }

    static async getById(req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if (movie) return res.json(movie)

        res.status(404).json({ message: "404 Movie not found" })
    }

    static async create(req, res) {
        const result = validateMovei(req.body)
        if (result.error) return res.status(400).sjoon({ error: JSON.parse(result.error.message) })
        const newMovie = await MovieModel.create({ input: result.data })
        res.status(201).json(newMovie)
    }

    static async update(req, res) {
        const result = validatePartialMovie(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updatedMovie = await MovieModel.update({ id, input: result.data })

        if (!updatedMovie) return res.status(400).json({ message: "Movie not found" })


        return res.json(updatedMovie)
    }

    static async delete(req, res) {
        const { id } = req.params

        const result = await MovieModel.delete({ id })

        return res.json(result)
    }

}