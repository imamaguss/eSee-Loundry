'use strict';
const fs = require('fs');
module.exports = {
  up: (queryInterface, Sequelize) => {
    let output = []
    const data = fs.readFileSync('./data.json', 'utf8');
    const arrData = JSON.parse(data)
      .forEach(laundry => {
        output.push({
          name: laundry.name,
          address: laundry.address,
          pricePerKg: laundry.pricePerKg,
          city: laundry.city,
          district: laundry.district,
          photo: null,
          createdAt: new Date,
          updatedAt: new Date
        })
      })

    return queryInterface.bulkInsert('Laundries', output, {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Laundries', null, {});
  }
};