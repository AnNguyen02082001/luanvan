const { Employee } = require('../models');
const bcrypt = require('bcrypt'); // Nếu bạn sử dụng bcrypt để mã hóa mật khẩu
const jwt = require('jsonwebtoken'); // Nếu bạn muốn sử dụng JWT để xác thực

const loginEmployee = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Kiểm tra xem nhân viên có tồn tại không
      const employee = await Employee.findOne({
        where: { username },
      });
  
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Kiểm tra mật khẩu (dùng bcrypt để so sánh)
      const isPasswordValid = await bcrypt.compare(password, employee.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Tạo JWT token
      const token = jwt.sign(
        { employee_id: employee.employee_id, username: employee.username },
        'your-secret-key', // Thay bằng secret key của bạn
        { expiresIn: '1h' } // Token hết hạn sau 1 giờ
      );
  
      // Trả về thông tin đăng nhập
      res.status(200).json({
        message: 'Login successful',
        employee: {
          employee_id: employee.employee_id,
          username: employee.username,
          name: employee.name,
        },
        token,
      });
    } catch (error) {
      console.error('Error logging in employee:', error);
      res.status(500).json({ error: 'Failed to login employee' });
    }
  };
const registerEmployee = async (req, res) => {
    try {
      const { username, password, name } = req.body;
  
      // Kiểm tra nếu username đã tồn tại
      const existingEmployee = await Employee.findOne({
        where: { username },
      });
  
      if (existingEmployee) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Tạo Employee mới
      const newEmployee = await Employee.create({
        username,
        password: hashedPassword,
        name,
      });
  
      res.status(201).json({
        message: 'Employee registered successfully',
        employee: {
          employee_id: newEmployee.employee_id,
          username: newEmployee.username,
          name: newEmployee.name,
        },
      });
    } catch (error) {
      console.error('Error registering employee:', error);
      res.status(500).json({ error: 'Failed to register employee' });
    }
  };

module.exports = { loginEmployee, registerEmployee };
