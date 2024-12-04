const { Category } = require("../models");



// Thêm Category
const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    // Tạo Category mới
    const newCategory = await Category.create({ category_name });

    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Failed to add category' });
  }
};

// Sửa Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL
    const { category_name } = req.body; // Lấy dữ liệu từ request body

    // Tìm Category cần sửa
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Cập nhật thông tin Category
    await category.update({ category_name });

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Xóa Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL

    // Tìm Category cần xóa
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Xóa Category
    await category.destroy();

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
// Lấy tất cả Categories
const getAllCategories = async (req, res) => {
    try {
    console.log(123)
    return
      const Category = await Category.findAll({
        attributes: ['category_id', 'category_name', 'created_date', 'updated_date'],
      });
  
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  };
  
  // Lấy chi tiết một Category
  const getCategoryById = async (req, res) => {
    try {
      const { id } = req.params; // Lấy ID từ URL
  
      const category = await Category.findByPk(id, {
        attributes: ['category_id', 'category_name', 'created_date', 'updated_date'],
      });
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.status(200).json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  };

module.exports = { 
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
 };
