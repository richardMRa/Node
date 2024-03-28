import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '0812Mora!',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
    static async getAll({ genre }) {

        if (genre) {

            const [result] = await connection.query(
                `SELECT BIN_TO_UUID(movie.id) id, title, year, director, duration, poster, rate FROM movie_genres
                INNER JOIN genre on movie_genres.genre_id = genre.id
                INNER JOIN movie on movie_genres.movie_id = movie.id
                WHERE LOWER(genre.name) = LOWER(?);`,
                [genre]
            )

            if (result.length === 0) return [{ message: "Genre was not found" }]

            return result

        }


        const [result] = await connection.query(
            'SELECT *, BIN_TO_UUID(ID) id FROM movie;'
        )

        return result
    }

    static async getById({ id }) {
        const [movie] = await connection.query(
            'SELECT BIN_TO_UUID(ID) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);', [id]
        )

        if (movie.length === 0) return null

        return movie
    }

    static async create({ input }) {

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult


        const {
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = input


        try {
            const [result] = await connection.query(
                `INSERT INTO movie(id, title, year, director, duration, poster, rate) 
            VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`, [title, year, director, duration, poster, rate])
        } catch (e) {
            throw new Error('Error creating movie')
        }

        const [movies] = await connection.query(
            `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM
            movie WHERE id = (UUID_TO_BIN(?));`, [uuid]
        )

        return movies
    }

    static async update({ id, input }) {

        try {
            const query = connection.format('UPDATE movie SET ? WHERE id = UUID_TO_BIN(?);', [input, id])
            const [result] = await connection.query(query)

            return result
        } catch (error) {
            console.log(error)
        }

    }

    static async delete({ id }) {
        try {
            const [movies] = await connection.query(
                `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM
            movie WHERE id = (UUID_TO_BIN(?));`, [id]
            )

            const [result] = await connection.query(
                `DELETE FROM movie WHERE id = UUID_TO_BIN(?);`, [id]
            )

            return { ...movies[0], message: "Movie deleted succesfully" }

        } catch (e) {

            throw new Error('Error deleting movie')
        }


    }
}