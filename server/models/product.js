'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {foreignKey: "categoryId"})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name cannot be empty`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Image cannot be empty`
        },
        isUrl: {
          args: true,
          msg: `Image must be url`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: `Price must in number`
        },
        notEmpty: {
          args: true,
          msg: `Price cannot be empty`
        },
        isPositive(value){
          if(value <= 0){
            throw new Error('Must be in positive number and more than 0')
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: `Stock must in number`
        },
        notEmpty: {
          args: true,
          msg: `Stock cannot be empty`
        },
        isPositive(value){
          if(value < 0){
            throw new Error('Must be in positive number')
          }
        }
      }
    },
  categoryId: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: {
        msg: `Category cannot be empty`
      }
    }
  }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};