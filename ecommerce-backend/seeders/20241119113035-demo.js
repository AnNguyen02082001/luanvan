const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];
    for (let i = 0; i < 50; i++) {
      products.push({
        category_id: faker.number.int({ min: 1, max: 5 }), // Thay thế faker.datatype.number bằng faker.number.int
        name: faker.commerce.productName(),
        stock_quantity: faker.number.int({ min: 0, max: 100 }), // Thay thế faker.datatype.number bằng faker.number.int
        image_url: faker.image.url(), // Tạo URL hình ảnh (phiên bản mới dùng faker.image.url)
        price: faker.commerce.price(),
        created_date: faker.date.past(),
        updated_date: faker.date.recent(),
        description: faker.commerce.productDescription(),
        color: faker.color.human(), // faker.color.human thay thế faker.commerce.color nếu cần
        ram: `${faker.number.int({ min: 4, max: 32 })}GB`, // Thay thế faker.datatype.number bằng faker.number.int
      });
    }

    await queryInterface.bulkInsert('products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};

