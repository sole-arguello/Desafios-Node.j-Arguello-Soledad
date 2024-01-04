import dotenv from 'dotenv';
dotenv.config()
import {UsersManagerMongo } from '../src/dao/managers/mongo/usersManagerMongo.js'
import mongoose from 'mongoose'
import Assert  from 'assert'
import { usersModel } from '../src/dao/managers/mongo/models/users.models.js'


const assert = Assert.strict
//mongodb+srv://soledadar:g04D4zMd9O4y2GvK@cluster0.njbseut.mongodb.net/tiendaDB-Test?retryWrites=true&w=majority
try {
    await mongoose.connect(process.env.MONGO_URL_TEST)
    console.log('Conectado a MongoDB Atlas Test')
} catch (error) {
   console.log(error.message) 
}

describe('Pruebas de modulos de usuarios dao', () => {
    
    beforeEach(async function(){
        await usersModel.deleteMany({})
    })

    it('Prueba de creacion de usuarios', async () => {
        const usersDao = new UsersManagerMongo()
        const user = {
            first_name: 'test',
            last_name: 'test',
            email: 'test@test',
            age: 10,
            password: 'test'
        }
        const result = await usersDao.createUsers(user)
        console.log('resultado', result)
        assert.strictEqual(result._id, true)

    })

    // it('Prueba que permite obtener todos los usuarios', async () => {
    //     const usersdao = new UsersManagerMongo()
    //     const result = await usersdao.getUsers()
    //     console.log('resultado', result)

    //     //comparacion valor actual y esperado
    //     assert.strictEqual(Array.isArray(result), true)
    // })
})