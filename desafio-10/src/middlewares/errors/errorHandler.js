import {EError } from '../../service/errors/enums.js';

export const errorHandler = (error, req, res, next) => {
    console.log(error.cause)
    switch (error.code) {
        case EError.INVALID_TYPES_ERROR:

            res.json({ status: 'error', message: error.cause })
            break

        case EError.DATABASE_ERROR:
            res.json({ status: 'error', message: error.cause })
            break

        case EError.ROUTING_ERROR:
            res.json({ status: 'error', message: error.cause })
            break

        case EError.INVALID_LOGIN:
            res.json({ status: 'error', message: error.cause })
            break;
        default:
            res.json({ status: 'error', message:'Unhandled Error' })
    }
}