import { expect } from 'chai'
import supertest from 'supertest'  

const request = supertest('http://localhost:8080')

describe('Testing de ecommerce', () => {

    describe('Test de usuarios', () => {
        it('El endpoint de Post /api/session/register debe registrar un usuario', async function () {
            const newUser = {
                first_name: 'test',
                last_name: 'test',
                email: 'test@test',
                age: 10,
                password: 'test'
            }
            const  registerResponse = await request.post('/api/session/register').send(newUser);
            expect(registerResponse.status).to.be.eql(201);
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