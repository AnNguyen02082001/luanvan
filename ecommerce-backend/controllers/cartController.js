const { Cart, Customer, Product } = require('../models');

// Lấy tất cả Cart items
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      include: [
        { model: Customer, attributes: ['name', 'username'] },
        { model: Product, attributes: ['name', 'price', 'stock_quantity'] },
      ],
      attributes: ['customer_id', 'product_id', 'bill_id', 'price', 'quantity_product'],
    });
    res.status(200).json(carts);
  } catch (error) {
    console.error('Error fetching carts:', error);
    res.status(500).json({ error: 'Failed to fetch carts' });
  }
};

// Lấy chi tiết một Cart item
const getCartById = async (req, res) => {
  try {
    const { customer_id, product_id } = req.params;

    const cart = await Cart.findOne({
      where: { customer_id, product_id },
      include: [
        { model: Customer, attributes: ['name', 'username'] },
        { model: Product, attributes: ['name', 'price', 'stock_quantity'] },
      ],
      attributes: ['customer_id', 'product_id', 'bill_id', 'price', 'quantity_product'],
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart item:', error);
    res.status(500).json({ error: 'Failed to fetch cart item' });
  }
};

// Thêm Cart item
const addCart = async (req, res) => {
    try {
      const { customer_id, product_id, bill_id = null, price, quantity_product } = req.body;
  
      // Kiểm tra các trường bắt buộc (ngoại trừ bill_id)
      if (!customer_id || !product_id || !price || !quantity_product) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Thêm mới vào giỏ hàng
      const newCart = await Cart.create({
        customer_id,
        product_id,
        bill_id, // Có thể null
        price,
        quantity_product,
      });
  
      res.status(201).json({
        message: 'Cart item added successfully',
        cart: newCart,
      });
    } catch (error) {
      console.error('Error adding cart item:', error);
      res.status(500).json({ error: 'Failed to add cart item' });
    }
  };
  

// Sửa Cart item
const updateCart = async (req, res) => {
  try {
    const { customer_id, product_id } = req.params;
    const { bill_id, price, quantity_product } = req.body;

    const cart = await Cart.findOne({ where: { customer_id, product_id } });

    if (!cart) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Cập nhật giỏ hàng
    await cart.update({
      bill_id,
      price,
      quantity_product,
    });

    res.status(200).json({
      message: 'Cart item updated successfully',
      cart,
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

// Xóa Cart item
const deleteCart = async (req, res) => {
  try {
    const { customer_id, product_id } = req.params;

    const cart = await Cart.findOne({ where: { customer_id, product_id } });

    if (!cart) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Xóa item khỏi giỏ hàng
    await cart.destroy();

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
};

module.exports = { getAllCarts, getCartById, addCart, updateCart, deleteCart };
