import { z } from 'zod';

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string type',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().min(1900).max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(0),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }).endsWith('.jpg' || '.jpeg'),
    genre: z.array(
        z.enum(
            ['Action', 'Crime', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']
        ),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }
    )
})

export function validateMovie(object) {
    return movieSchema.safeParse(object)
}

export function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object)
}
