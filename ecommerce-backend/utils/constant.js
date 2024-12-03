const { faker } = require('@faker-js/faker'); // Thay đổi import đúng cách cho thư viện mới

// Fake data cho bảng Users
const fakeUsers = (count = 10) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      phone_number: `+84 ${faker.phone.number('###########').substring(0, 15)}`,
      role: faker.helpers.arrayElement(['customer', 'employee']),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
      address: faker.address.streetAddress(),
      
    });
  }
  return users;
};

// Fake data cho bảng Products
const fakeProducts = (count = 10) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price(10, 1000, 2)),
      category: faker.commerce.department(),
      brand: faker.company.name(),
      stock_quantity: faker.number.int({ min: 0, max: 100 }),
      image_url: faker.image.url({ width: 640, height: 480, category: 'product', random: true }),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }
  return products;
};

// Fake data cho bảng Orders
const fakeOrders = (userIds, count = 10) => {
  const orders = [];
  for (let i = 0; i < count; i++) {
    orders.push({
      user_id: faker.helpers.arrayElement(userIds),
      order_date: faker.date.past(),
      status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
      total_amount: parseFloat(faker.commerce.price(50, 500, 2)),
      shipping_address: faker.address.streetAddress(),
      payment_status: faker.helpers.arrayElement(['unpaid', 'paid', 'refunded']),
      shipping_date: faker.date.future(),
      
    });
  }
  return orders;
};

// Fake data cho bảng Order Items
const fakeOrderItems = (orderIds, productIds, count = 10) => {
  const orderItems = [];
  for (let i = 0; i < count; i++) {
    orderItems.push({
      order_id: faker.helpers.arrayElement(orderIds),
      product_id: faker.helpers.arrayElement(productIds),
      quantity: faker.number.int({ min: 1, max: 5 }),
      unit_price: parseFloat(faker.commerce.price(10, 1000, 2)),
      subtotal: parseFloat(faker.commerce.price(20, 5000, 2)),
    });
  }
  return orderItems;
};

// Fake data cho bảng Inventory
const fakeInventory = (productIds) => {
  const inventory = [];
  productIds.forEach((productId) => {
    inventory.push({
      product_id: productId,
      stock_quantity: faker.number.int({ min: 0, max: 500 }),
      last_updated: faker.date.recent(),
    });
  });
  return inventory;
};

// Fake data cho bảng Payments
const fakePayments = (orderIds, count = 10) => {
  const payments = [];
  for (let i = 0; i < count; i++) {
    payments.push({
      order_id: faker.helpers.arrayElement(orderIds),
      payment_method: faker.helpers.arrayElement(['credit_card', 'paypal', 'cash_on_delivery']),
      amount_paid: parseFloat(faker.commerce.price(50, 500, 2)),
      payment_date: faker.date.recent(),
      payment_status: faker.helpers.arrayElement(['pending', 'completed', 'failed', 'refunded']),
    });
  }
  return payments;
};

function generateTrackingNumber(length = 10) {
    const chars = 'ABCD0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

// Fake data cho bảng Shipping
const fakeShipping = (orderIds, count = 10) => {
  const shipping = [];
  for (let i = 0; i < count; i++) {
    shipping.push({
      order_id: faker.helpers.arrayElement(orderIds),
      shipping_company: faker.company.name(),
      tracking_number: generateTrackingNumber(),


      shipping_status: faker.helpers.arrayElement(['pending', 'shipped', 'delivered']),
      estimated_delivery_date: faker.date.future(),
      actual_delivery_date: faker.date.future(),
    });
  }
  return shipping;
};

// Fake data cho bảng Categories
const fakeCategories = (count = 5) => {
  const categories = [];
  for (let i = 0; i < count; i++) {
    categories.push({
      category_name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
    });
  }
  return categories;
};

// Fake data cho bảng Product Categories
const fakeProductCategories = (productIds, categoryIds) => {
  const productCategories = [];
  productIds.forEach((productId) => {
    productCategories.push({
      product_id: productId,
      category_id: faker.helpers.arrayElement(categoryIds),
    });
  });
  return productCategories;
};

// Fake data cho bảng Reviews
const fakeReviews = (userIds, productIds, count = 10) => {
  const reviews = [];
  for (let i = 0; i < count; i++) {
    reviews.push({
      user_id: faker.helpers.arrayElement(userIds),
      product_id: faker.helpers.arrayElement(productIds),
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
      created_at: faker.date.recent(),
    });
  }
  return reviews;
};

// Fake data cho bảng Cart
const fakeCart = (userIds, productIds, count = 10) => {
  const cart = [];
  for (let i = 0; i < count; i++) {
    cart.push({
      user_id: faker.helpers.arrayElement(userIds),
      product_id: faker.helpers.arrayElement(productIds),
      quantity: faker.number.int({ min: 1, max: 10 }),
    });
  }
  return cart;
};

// Export các hàm fake data
module.exports = {
  fakeUsers,
  fakeProducts,
  fakeOrders,
  fakeOrderItems,
  fakeInventory,
  fakePayments,
  fakeShipping,
  fakeCategories,
  fakeProductCategories,
  fakeReviews,
  fakeCart,
};
