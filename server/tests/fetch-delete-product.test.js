const app = require('../app')
const request = require('supertest');
const { queryInterface } = require('../models').sequelize
const UserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ1c2VyQHRva29zZWJlbGFoLmNvbSIsImlhdCI6MTU5NTM1NTcwNX0.0B0xh-90H1wfhdAN_GmtPn5wyRhA5-1a_sukReuFxOc"
const AdminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZG1pbkB0b2tvc2ViZWxhaC5jb20iLCJpYXQiOjE1OTUzNTM5MjR9.3CLQCiY8TmuNzRex7cXdqAKGBjcfXp2TksQyX0qMGAI"


beforeAll((done) => {
  const newProduct = [{ 
    name: "Asus ROG", 
    price: "5000000", 
    stock: "25", 
    image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
    categoryId: 1,
    createdAt: new Date (),
    updatedAt: new Date (),
  }]

  queryInterface.bulkInsert('Products', newProduct, {})
  done()
})

describe('Fetch data from database', () => {
    test('Get all list', (done) => {
        request(app)
        .get('/products')
        .set("access_token", AdminToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.length).toBe(3)
          done()
        }).catch(done)
    })
    
    test('Get all list, No Access Token', (done) => {
      const id = 6

      request(app)
          .get(`/products/${id}`)
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body).toBe("Token invalid!")
            done()
          }).catch(done)
    })

    test('Get all list, Using unknown Token ', (done) => {
      const id = 6

      request(app)
          .get(`/products/${id}`)
          .set("access_token", "eyJhbGciOiJIUzI1NikpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZG1pbkB0b2tvc2ViZWxhaC5jb20iLCJpYXQiOjE1OTUzNTM5MjR9.3CLQCiY8TmuNzRex7cXdqAKGBjcfXp2TksQyX0qMGAI")
          .expect('Content-Type', /json/)
          .expect(400)
          .then(response => {
            expect(response.body).toBe("Token invalid!")
            done()
          }).catch(done)
    })
})

describe('Delete product from database', () => {
    test('Delete specific product', (done) => {
        const id = 7

        request(app)
        .delete(`/products/${id}`)
        .set("access_token", AdminToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).toBe("Product deleted!")
          done()
        }).catch(done)
    })

    test('Delete specific product failed, Product not found', (done) => {
      const id = 11

      request(app)
          .delete(`/products/${id}`)
          .set("access_token", AdminToken)
          .expect('Content-Type', /json/)
          .expect(404)
          .then(response => {
            expect(response.body).toBe("Data not found")
            done()
          }).catch(done)
  })

  test('Delete specific product failed, Not the right role ', (done) => {
    const id = 11

    request(app)
        .delete(`/products/${id}`)
        .set("access_token", UserToken)
        .expect('Content-Type', /json/)
        .expect(403)
        .then(response => {
          expect(response.body).toBe("You are not Authorized!")
          done()
        }).catch(done)
  })
})