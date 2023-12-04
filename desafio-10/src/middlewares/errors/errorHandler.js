import {EError } from '../../service/errors/enums.js';

export const errorHandler = (error, req, res, next) => {
    console.log('paso por errorHandler',error.cause)
    switch (error.code) {
        case EError.INVALID_TYPES_ERROR:

            res.json({ status: 'error', error: error.message })
            break

        case EError.DATABASE_ERROR:
            res.json({ status: 'error', error: error.cause })
            break

        case EError.ROUTING_ERROR:
            res.json({ status: 'error', error: error.cause })
            break

        case EError.INVALID_LOGIN:
            res.json({ status: 'error', error: error.message })
            break;
        default:
            res.json({ status: 'error', error:'Unhandled Error' })
    }
}