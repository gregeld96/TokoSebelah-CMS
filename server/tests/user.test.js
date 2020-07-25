const request = require('supertest')
const app = require('../app')
const { hashPassword } = require('../helpers/bcrypt')
const { queryInterface } = require('../models').sequelize

// beforeAll((done) => {
//     let newPassword = hashPassword("admin")

//     const newAdmin = [
//       {
//         name: "Admin",
//         email: "admin@tokosebelah.com",
//         password: newPassword,
//         role: "admin",
//         createdAt: new Date (),
//         updatedAt: new Date (),
//       },
//       {
//         name: "User",
//         email: "user@tokosebelah.com",
//         password: newPassword,
//         role: "user",
//         createdAt: new Date (),
//         updatedAt: new Date (),
//       }
//     ]

//     queryInterface.bulkInsert('Users', newAdmin, {})
//     done()
// })

describe('Test Login Admin', () => {
    test('Login Admin Successful', (done) => {
        const dummyAccount = {email: "admin@tokosebelah.com", password: "admin"}

        request(app)
            .post('/login')
            .send(dummyAccount)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then (response => {
                console.log(response.body.access_token, '==== Token')
                expect(response.body.msg).toBe('Successfully logged in!')
                done()
            }).catch(done)
    })

    test('Login Admin Failed, No Email', (done) => {
        const dummyAccount = {email: "", password: "admin"}

        request(app)
            .post('/login')
            .send(dummyAccount)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then (response => {
                expect(response.body).toBe('Email and Password required')
                done()
            }).catch(done)
    })

    test('Login Admin Failed, No Password', (done) => {
        const dummyAccount = {email: "admin", password: ""}

        request(app)
            .post('/login')
            .send(dummyAccount)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then (response => {
                expect(response.body).toBe('Email and Password required')
                done()
            }).catch(done)
    })

    test('Login Admin Failed, Wrong Password', (done) => {
        const dummyAccount = {email: "admin@tokosebelah.com", password: "ad"}

        request(app)
            .post('/login')
            .send(dummyAccount)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then (response => {
                expect(response.body).toBe('Email or Password Invalid')
                done()
            }).catch(done)
    })

    test('Login Admin Failed, Wrong Email', (done) => {
        const dummyAccount = {email: "admin", password: "admin"}

        request(app)
            .post('/login')
            .send(dummyAccount)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then (response => {
                expect(response.body).toBe('Email or Password Invalid')
                done()
            }).catch(done)
    })
    

    test('Login Admin Failed, No Email & Password', (done) => {
        const dummyAccount = {email: "", password: ""}

        request(app)
            .post('/login')
            .send(dummyAccount)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then (response => {
                expect(response.body).toBe('Email and Password required')
                done()
            }).catch(done)
    })
})

describe('Test Login User', () => {
    test('Login User Failed', (done) => {
        const dummyAccount = {email: "user@tokosebelah.com", password: "admin"}

        request(app)
            .post('/login')
            .send(dummyAccount)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then (response => {
                expect(response.body.msg).toBe('Email or Password Invalid')
                done()
            }).catch(done)
    })
})

// afterAll((done) => {
//     queryInterface.bulkDelete('Users')
//     done()
// })