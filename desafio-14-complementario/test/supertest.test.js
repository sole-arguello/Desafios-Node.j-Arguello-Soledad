import { app } from '../src/app.js'
import { expect } from 'chai'
import supertest from 'supertest' 
import { usersModel } from '../src/dao/managers/mongo/models/users.models.js'

const request = supertest(app)

describe('Testing de ecommerce', () => {

    before(async function(){
        await usersModel.deleteMany({})
    })

    describe('Test de usuarios', () => {
        it('El endpoint de Post /api/sessions/register debe registrar un usuario', async function () {
            const newUser = {
                first_name: 'test',
                last_name: 'test',
                email: 'test@test',
                age: 10,
                password: 'test'
            }
            const  registerResponse = await request.post('/api/sessions/register').send(newUser);
            expect(registerResponse.status).to.be.eql(200);
        })
    })
})


// import {UsersManagerMongo } from '../src/dao/managers/mongo/usersManagerMongo.js'
// import mongoose from 'mongoose'
// import Assert  from 'assert'
// import { usersModel } from '../src/dao/managers/mongo/models/users.models.js'


// const assert = Assert.strict

// try {
//     await mongoose.connect('')
//     console.log('Conectado a MongoDB Atlas Test')
// } catch (error) {
//    console.log(error.message) 
// }

// describe('Pruebas de modulos de usuarios dao', () => {
    
//     beforeEach(async function(){
//         await usersModel.deleteMany({})
//     })

//     it('Prueba de creacion de usuarios', async () => {
//         const usersDao = new UsersManagerMongo()
//         const user = {
//             first_name: 'test',
//             last_name: 'test',
//             email: 'test@test',
//             age: 10,
//             password: 'test'
//         }
//         const result = await usersDao.createUsers(user)
//         console.log('resultado', result)
//         assert.strictEqual(result._id, true)

//     })

//     it('Prueba que permite obtener todos los usuarios', async () => {
//         const usersdao = new UsersManagerMongo()
//         const result = await usersdao.getUsers()
//         console.log('resultado', result)

//         //comparacion valor actual y esperado
//         assert.strictEqual(Array.isArray(result), true)
//     })
// })