const { Product } = require('../models')

class ProductController {
    static add (req, res , next){
        const newProduct = { 
            name: req.body.name, 
            price: req.body.price, 
            stock: req.body.stock, 
            image_url: req.body.image_url,
            categoryId: req.body.categoryId
        }

        if(newProduct.stock < 1){
            next({
                status: 400,
                msg: "Stock must more than 0"
            })
        }
        Product.create(newProduct)
                .then(data => {
                    res.status(201).json({data, msg: `${data.name} successfully added!`})
                })
                .catch(err => {
                    next(err)
                })
    }

    static read (req, res, next){
        Product.findAll()
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    next(err)
                })
    }

    static delete (req, res, next){
        Product.findByPk(req.params.id)
                .then(data => {
                    if (!data){
                        throw ({status: 404, msg:'Data not found'})
                    } else {
                        return Product.destroy({where: {id: req.params.id}})
                    }
                })
                .then(data => {
                    res.status(200).json('Product deleted!')
                })
                .catch(err => {
                    next(err)
                })
    }

    static edit (req, res , next){
        const updatedProduct = {
            id: req.params.id, 
            name: req.body.name, 
            price: req.body.price, 
            stock: req.body.stock, 
            image_url: req.body.image_url,
            categoryId: req.body.categoryId
        }

        Product.findByPk(req.params.id)
            .then(data => {
                if (!data){
                    throw ({status: 404, msg: "Data not found"})
                } else {
                    return Product.update(updatedProduct, {where: {id: req.params.id}})
                }
            })
            .then(data => {
                res.status(200).json({product: updatedProduct, msg: 'Product edited!'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController;