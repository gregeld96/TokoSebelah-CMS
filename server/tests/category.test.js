const app = require('../app')
const request = require('supertest');
const { queryInterface } = require('../models').sequelize
const UserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ1c2VyQHRva29zZWJlbGFoLmNvbSIsImlhdCI6MTU5NTM1NTcwNX0.0B0xh-90H1wfhdAN_GmtPn5wyRhA5-1a_sukReuFxOc"
const AdminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZG1pbkB0b2tvc2ViZWxhaC5jb20iLCJpYXQiOjE1OTUzNTM5MjR9.3CLQCiY8TmuNzRex7cXdqAKGBjcfXp2TksQyX0qMGAI"

beforeAll((done) => {
    const newCategory = [
      {
        name: "Electronics",
        createdAt: new Date (),
        updatedAt: new Date (),
      }
    ]

    const newProduct = [{ 
      name: "Hp Asus Zenfone 6", 
      price: "5000000", 
      stock: "25", 
      image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
      categoryId: 1,
      createdAt: new Date (),
      updatedAt: new Date (),
    }]

    queryInterface.bulkInsert('Products', newProduct, {})
    queryInterface.bulkInsert('Categories', newCategory, {})
    done()
})

describe('Test list of category', () => {
    test('Get all category', (done) => {
        request(app)
            .get('/categories')
            .set("access_token", AdminToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
              expect(response.body.length).toBe(7)
              done()
            }).catch(done)
    })

    test('Get specific category Success, Data found', (done) => {
        const name = "Electronics"

        request(app)
            .get(`/categories/${name}`)
            .set("access_token", AdminToken)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
              expect(response.body.data).toHaveProperty('name', 'Electronics')
              expect(response.body.data.Products[0]).toHaveProperty('name','Laptop Lenovo')
              done()
            }).catch(done)
    })

    test('Get specific category Failed, No data found', (done) => {
        const name = "Clothes"

        request(app)
            .get(`/categories/${name}`)
            .set("access_token", AdminToken)
            .expect('Content-Type', /json/)
            .expect(404)
            .then(response => {
              expect(response.body).toBe("Data not found")
              done()
            }).catch(done)
    })
})

describe('Create Category', () => {
    test('Create new category', (done) => {
        const newCategory = {name: "Books"}

        request(app)
            .post('/categories/add')
            .set("access_token", AdminToken)
            .send(newCategory)
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
              expect(response.body.msg).toBe("Category created!")
              done()
            }).catch(done)
    })

    test('Create new Category Failed, No name', (done) => {
        const newCategory = {name: ""}

        request(app)
            .post('/categories/add')
            .set("access_token", AdminToken)
            .send(newCategory)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
              expect(response.body).toBe("Name cannot be empty")
              done()
            }).catch(done)
    })

    test('Create new Category Failed, Not the right role ', (done) => {
      const newCategory = {name: "Books"}
  
      request(app)
          .post('/categories/add')
          .set("access_token", UserToken)
          .expect('Content-Type', /json/)
          .expect(403)
          .then(response => {
            expect(response.body).toBe("You are not Authorized!")
            done()
          }).catch(done)
    })
})