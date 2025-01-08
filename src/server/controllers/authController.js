const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra nếu chưa có admin
    const isAdminExists = await User.findOne({ role: 'admin' });

    const newUser = new User({
      username,
      password,
      role: isAdminExists ? 'user' : 'admin', // Gán quyền admin nếu chưa có admin
    });

    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng ký', error });
  }
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: 'Tài khoản không tồn tại!' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu!' });
  
      const token = jwt.sign({ id: user._id, role: user.role }, 'secret_key', { expiresIn: '1d' });
      res.status(200).json({ token, role: user.role });
    } catch (error) {
      console.error(error); // Log lỗi chi tiết ra console
      res.status(500).json({ message: 'Lỗi khi đăng nhập', error });
    }
  };
  
  

module.exports = { register, login };
