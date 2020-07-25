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

describe('Edit Product to the List', () => {
    test('Edit specific Product Successfully', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Laptop Lenovo", 
            price: 7000000, 
            stock: 2, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.msg).toBe(`Product edited!`)
                expect(response.body.product).toHaveProperty('name', 'Laptop Lenovo')
                done()
            })
            .catch(done)
    })

    test('Edit specific product failed, Product not found', (done) => {
        const id = 3

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .expect('Content-Type', /json/)
            .expect(404)
            .then(response => {
              expect(response.body).toBe("Data not found")
              done()
            }).catch(done)
    })

    test('Edit Product Failed, No Name', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "", 
            price: 7000000, 
            stock: 2, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Name cannot be empty`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, No Price', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: "", 
            stock: 24,
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png"
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Must be in positive number and more than 0,Price must in number,Price cannot be empty`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, Price not numeric', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: "123a", 
            stock: 24,
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png"
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Price must in number`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, Price is float numeric', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: 25.4000, 
            stock: 25,
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png"
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Price must in number`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, Price is negative and float numeric', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: -1234.6, 
            stock: 25,
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png"
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Must be in positive number and more than 0,Price must in number`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, No Stock', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: 250000, 
            stock: "",
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png"
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Stock must in number,Stock cannot be empty`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, Stock not numeric', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: 250000, 
            stock: "a3",
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png"
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Stock must in number`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, Stock is float numeric', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: 250000, 
            stock: 2.5,
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png"
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Stock must in number`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, Stock is negative and float numeric', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: 250000, 
            stock: -1234.6,
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png"
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Must be in positive number,Stock must in number`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, No Image Url', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Laptop Lenovo", 
            price: 7000000, 
            stock: 2, 
            image_url: "",
            categoryId: 1
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Image cannot be empty,Image must be url`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, Not Image Url Format', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Laptop Lenovo", 
            price: 7000000, 
            stock: 2, 
            image_url: "gogogo",
            categoryId: 1
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Image must be url`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, No Category', (done) => {
        const id = 1

        const updatedProduct = { 
            name: "Laptop Lenovo", 
            price: 7000000, 
            stock: 2, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: ''
        }

        request(app)
            .put(`/products/${id}`)
            .set("access_token", AdminToken)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Category cannot be empty`)
                done()
            })
            .catch(done)
    })

    test('Edit Product Failed, Not the right role ', (done) => {
        const id = 11
    
        request(app)
            .put(`/products/${id}`)
            .set("access_token", UserToken)
            .expect('Content-Type', /json/)
            .expect(403)
            .then(response => {
              expect(response.body).toBe("You are not Authorized!")
              done()
            }).catch(done)
      })
})