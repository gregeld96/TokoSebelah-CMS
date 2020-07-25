'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let newPassword = hashPassword("admin")

    const newAdmin = [
      {
      name: "Admin",
      email: "admin@tokosebelah.com",
      password: newPassword,
      role: "admin",
      createdAt: new Date (),
      updatedAt: new Date (),
      },
      {
      name: "User",
      email: "user@tokosebelah.com",
      password: newPassword,
      role: "user",
      createdAt: new Date (),
      updatedAt: new Date (),
      }
    ]

    return queryInterface.bulkInsert('Users', newAdmin, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
