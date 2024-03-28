import { Router } from 'express'
import { MovieController } from '../controllers/movieController.js'

export const createMovieRouter = ({ movieModel }) => {

    const moviesRouter = Router()

    const movieController = new MovieController({ movieModel })

    // GET movies
    moviesRouter.get('/', movieController.getAll)
    // GET movies by id
    moviesRouter.get('/:id', movieController.getById)
    // POST movie
    moviesRouter.post('/', movieController.create)
    // UPDATE movie
    moviesRouter.patch('/:id', movieController.update)
    // DELETE movie
    moviesRouter.delete('/:id', movieController.delete)

    return moviesRouter

}
