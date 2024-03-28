import { readJSON } from "../../utils.js"

const movies = readJSON('./movies.json')

export class MovieModel {
    static async getAll({ genre }) {

        if (genre) {
            const filteredMovies = movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
            return filteredMovies
        }

        return movies
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async create({ input }) {
        const newMovie = {
            id: crypto.randomUUID(), //UUID v4
            ...input
        }

        movies.push(newMovie)
        return (newMovie)
    }

    static async update({ id, input }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)

        if (movieIndex === -1) return false

        const updatedMovie = {
            ...movies[movieIndex],
            ...input
        }

        return updatedMovie

    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)

        if (movieIndex === -1) return false

        movies.splice(id, 1)

        return { message: `Movie deleted` }
    }
}