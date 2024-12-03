const bcrypt = require('bcrypt');
const { Customer } = require('../models');

const registerCustomer = async (req, res) => {
  try {
    const { username, password, phone_number, address, name } = req.body;

    // Kiểm tra nếu username hoặc phone_number đã tồn tại
    const existingCustomer = await Customer.findOne({
      where: {
        username,
      },
    });

    if (existingCustomer) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    const existingPhoneNumber = await Customer.findOne({
      where: {
        phone_number,
      },
    });
  
    if (existingPhoneNumber) {
      return res.status(400).json({ error: 'Phone number already exists' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Tạo tài khoản mới
    const newCustomer = await Customer.create({
      username,
      password: hashedPassword,
      phone_number,
      address,
      name,
    });

    res.status(201).json({ message: 'Customer registered successfully', customer: newCustomer });
  } catch (error) {
    console.error('Error registering customer:', error);
    res.status(500).json({ error: 'Failed to register customer' });
  }
};


const loginCustomer = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Kiểm tra xem tài khoản có tồn tại không
      const customer = await Customer.findOne({
        where: { username },
      });
  
      if (!customer) {
        return res.status(404).json({ error: 'Username not found' });
      }
  
      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, customer.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Trả về thông tin thành công
      res.status(200).json({ message: 'Login successful', customer });
    } catch (error) {
      console.error('Error logging in customer:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  };

module.exports = { registerCustomer, loginCustomer };
