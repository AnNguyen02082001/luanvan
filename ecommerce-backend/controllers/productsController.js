const { Product } = require('../models');

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: [
        'product_id',
        'name',
        'description',
        'price',
        'category_id',
        'stock_quantity',
        'image_url',
        'created_date',
        'updated_date',
        'color',
        'ram',
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


// Lấy chi tiết sản phẩm
const getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Lấy product_id từ URL
    const product = await Product.findOne({
      where: { product_id: id },
      attributes: [
        'product_id',
        'name',
        'description',
        'price',
        'category_id',
        'stock_quantity',
        'image_url',
        'created_date',
        'updated_date',
        'color',
        'ram',
      ],
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
};

module.exports = { getAllProducts, getProductById };
