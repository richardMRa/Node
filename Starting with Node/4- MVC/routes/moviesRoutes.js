import { Router } from 'express'

import { MovieModel } from '../models/movieModel.js'
import { validateMovie, validatePartialMovie } from '../schemas/moviesSchema.js'
import { MovieController } from '../controllers/movieController.js'
export const moviesRouter = Router()

// GET movies
moviesRouter.get('/', MovieController.getAll)
// GET movies by id
moviesRouter.get('/:id', MovieController.getById)
// POST movie
moviesRouter.post('/', MovieController.create)
// UPDATE movie
moviesRouter.patch('/:id', MovieController.update)
// DELETE movie
moviesRouter.delete('/:id', MovieController.delete)
