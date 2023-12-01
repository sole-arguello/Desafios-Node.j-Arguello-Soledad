import {EError } from '../../service/errors/enums.js';

export const errorHandler = (error, req, res, next) => {
    console.log(error.cause)
    switch (error.code) {
        case EError.INVALID_TYPES_ERROR:
            res.json({ status: 'error', message: error.name })
            break

        case EError.DATABASE_ERROR:
            res.json({ status: 'error', message: error.cause })
            break

        default:
            res.json({ status: 'error', message:'Error inesperado, Unhandled Error' })
    }
}