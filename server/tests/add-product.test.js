const app = require('../app')
const request = require('supertest');
const { queryInterface } = require('../models').sequelize
const UserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ1c2VyQHRva29zZWJlbGFoLmNvbSIsImlhdCI6MTU5NTM1NTcwNX0.0B0xh-90H1wfhdAN_GmtPn5wyRhA5-1a_sukReuFxOc"
const AdminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZG1pbkB0b2tvc2ViZWxhaC5jb20iLCJpYXQiOjE1OTUzNTM5MjR9.3CLQCiY8TmuNzRex7cXdqAKGBjcfXp2TksQyX0qMGAI"

describe('Add Product to the List', () => {
    test('Add Product Successfully', (done) => {
        const newProduct = { 
            name: "Laptop Lenovo", 
            price: "5000000", 
            stock: "25", 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                expect(response.body.msg).toBe(`${newProduct.name} successfully added!`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, No Name', (done) => {
        const newProduct = { 
            name: "", 
            price: "5000000", 
            stock: "25",
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Name cannot be empty`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, No Price', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: "", 
            stock: "25",
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Must be in positive number and more than 0,Price must in number,Price cannot be empty`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, Price not numeric', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: "1234aw", 
            stock: "25",
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Price must in number`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, Price is float numeric', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: 1234.56, 
            stock: "25",
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Price must in number`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, Price is negative and float numeric', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: -1234.6, 
            stock: "25",
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Must be in positive number and more than 0,Price must in number`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, No Stock', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: 250000, 
            stock: "",
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Stock must more than 0`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, Stock not numeric', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: 250000, 
            stock: "a3",
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Stock must in number`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, Stock is float numeric', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: 123456, 
            stock: 2.5,
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Stock must in number`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, Stock is negative and float numeric', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: 250000, 
            stock: -1234.6,
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Stock must more than 0`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, No Image Url', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: "5000000", 
            stock: "25",
            categoryId: 1, 
            image_url: "",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Image cannot be empty,Image must be url`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, Not Image Url Format', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: "5000000", 
            stock: "25",
            categoryId: 1, 
            image_url: "gogogo",
            categoryId: 1
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Image must be url`)
                done()
            })
            .catch(done)
    })

    test('Add Product Failed, No Category', (done) => {
        const newProduct = { 
            name: "Hp Asus Zenfone 6", 
            price: "5000000", 
            stock: "25",
            categoryId: 1, 
            image_url: "https://asset.kompas.com/crops/VUGKN7mQL1-GXZugeEdKwqn_gMY=/57x0:732x450/750x500/data/photo/2019/05/17/1624224850.png",
            categoryId: ""
        }

        request(app)
            .post('/products/add')
            .set("access_token", AdminToken)
            .send(newProduct)
            .expect('Content-Type', /json/)
            .expect(400)
            .then(response => {
                expect(response.body).toBe(`Category cannot be empty`)
                done()
            })
            .catch(done)
    })

      test('Add Product Failed, Not the right role ', (done) => {
        const id = 11
    
        request(app)
            .post(`/products/${id}`)
            .set("access_token", UserToken)
            .expect('Content-Type', /json/)
            .expect(403)
            .then(response => {
              expect(response.body).toBe("You are not Authorized!")
              done()
            }).catch(done)
      })
})