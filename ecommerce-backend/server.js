const express = require('express');
const cors = require('cors');  // Import cors
const productRoutes  = require('./routes/productsRoutes');
const authRoutes  = require('./routes/authRouter');
const categoryRoutes  = require('./routes/categoryRoutes');
const emloyeeRoutes  = require('./routes/emloyeeRouter');

const billRoutes  = require('./routes/billRouter');
const walletRoutes = require('./routes/walletRoutes');
const cartRoutes = require('./routes/cartRoutes');


const app = express();

// Sử dụng CORS cho toàn bộ ứng dụng
app.use(cors()); // Cho phép tất cả các domain gửi yêu cầu

// Middleware để parse JSON
app.use(express.json()); 

// Định nghĩa route cho sản phẩm
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categoryRoutes', categoryRoutes);
app.use('/api/employees', emloyeeRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/carts', cartRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
