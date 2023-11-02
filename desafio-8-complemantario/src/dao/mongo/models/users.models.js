import mongoose from 'mongoose';
import { usersService } from '../../index.js';

const usersCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    age: Number,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        enum: ['admin', 'Usuario'],
        default: 'Usuario'
    }
    
})

// userSchema.pre('save', async function(next) {
//     try {
//         const user = {}
//         const newCart = await usersService.createCart(user)
//         this.cart = newCart._id
//     } catch (error) {
//         next(error)
//     }
// })

export const usersModel = mongoose.model(usersCollection, userSchema);