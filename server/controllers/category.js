const { Category, Product } = require('../models')

class CategoryController {
    static read (req, res, next){
        Category.findAll()
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => {
                    next(err)
                })
    }

    static filter (req, res, next){
        Category.findOne({
                    where: {
                        name: req.params.name
                    },
                    include: [
                        {
                            model: Product
                        }
                    ]
                })
                .then(data => {
                    if (!data){
                        throw ({status: 404, msg:'Data not found'})
                    } else {
                        res.status(200).json({data})
                    }
                })
                .catch(err => {
                    next(err)
                })
    }

    static add (req, res, next){
        const newCategory = {
            name: req.body.name
        }

        Category.create(newCategory)
                .then(data => {
                    res.status(201).json({data, msg: "Category created!"})
                })
                .catch(err => {
                    next(err)
                })
    }

    static delete (req, res, next){
        Category.findByPk(req.params.id)
                .then(data => {
                    if (!data){
                        throw ({status: 404, msg:'Data not found'})
                    } else {
                        return Category.destroy({where: {id: req.params.id}})
                    }
                })
                .then(data => {
                    res.status(200).json('Category deleted!')
                })
                .catch(err => {
                    next(err)
                })
    }
}

module.exports = CategoryController;