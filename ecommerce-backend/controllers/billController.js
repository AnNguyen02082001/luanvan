const { Bill, Customer, Employee, Wallet } = require('../models');

// Lấy tất cả Bills
const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.findAll({
      include: [
        { model: Customer, attributes: ['name', 'username'], as: 'Customer' },
        { model: Employee, attributes: ['name', 'username'], as: 'Employee' },
        { model: Wallet, attributes: ['wallet_id'], as: 'Wallet' },
      ],
      attributes: [
        'bill_id',
        'wallet_id',
        'employee_id',
        'customer_id',
        'delivery_status',
        'total',
        'shipping_address',
        'created_date',
        'delivery_date',
      ],
    });

    res.status(200).json(bills);
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
};

// Lấy chi tiết một Bill
const getBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const bill = await Bill.findByPk(id, {
      include: [
        { model: Customer, attributes: ['name', 'username'], as: 'Customer' },
        { model: Employee, attributes: ['name', 'username'], as: 'Employee' },
        { model: Wallet, attributes: ['wallet_id'], as: 'Wallet' },
      ],
      attributes: [
        'bill_id',
        'wallet_id',
        'employee_id',
        'customer_id',
        'delivery_status',
        'total',
        'shipping_address',
        'created_date',
        'delivery_date',
      ],
    });

    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error('Error fetching bill:', error);
    res.status(500).json({ error: 'Failed to fetch bill' });
  }
};

const createBill = async (req, res) => {
    try {
      const {
        wallet_id,
        employee_id = null, // Nếu không được cung cấp, mặc định là null
        customer_id,
        delivery_status,
        total,
        shipping_address,
        delivery_date,
      } = req.body;
  
      // Kiểm tra các trường bắt buộc (ngoại trừ employee_id)
      if (!wallet_id || !customer_id || !total || !shipping_address || !delivery_status) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Tạo Bill mới
      const newBill = await Bill.create({
        wallet_id,
        employee_id, // Có thể là null
        customer_id,
        delivery_status,
        total,
        shipping_address,
        delivery_date,
      });
  
      res.status(201).json({
        message: 'Bill created successfully',
        bill: newBill,
      });
    } catch (error) {
      console.error('Error creating bill:', error);
      res.status(500).json({ error: 'Failed to create bill' });
    }
  };

module.exports = { createBill, getAllBills, getBillById };
