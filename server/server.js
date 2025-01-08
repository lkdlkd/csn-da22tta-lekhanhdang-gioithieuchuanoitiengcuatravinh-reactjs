const express = require('express');
const mongoose = require('mongoose');
const chuaRoutes = require('./routes/chuaRoutes');
//dang nhap va dang ky
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect('mongodb+srv://khanhdang2440:dang245@cluster0.cmpuh.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/api/chua', chuaRoutes);
//dang nhap va dang ky
app.use('/api/auth', authRoutes);

// Cấu hình multer cho ảnh chung
const uploadForImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, 'public/assets/image');
      cb(null, uploadPath); // Lưu vào public/assets/image
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName); // Đặt tên file là unique
    }
  })
});

// Cấu hình multer cho ảnh lịch sử
const uploadForHistoryImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, 'public/assets/img');
      cb(null, uploadPath); // Lưu vào public/assets/img
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName); // Đặt tên file là unique
    }
  })
});

// Định tuyến cho upload ảnh chung
app.post('/api/upload-image', uploadForImage.single('image'), (req, res) => {
  if (req.file) {
    const imageUrl = `/assets/image/${req.file.filename}`;
    res.json({ imageUrl }); // Trả về URL của ảnh
  } else {
    res.status(400).json({ message: 'Không có ảnh được upload.' });
  }
});

// Định tuyến cho upload ảnh lịch sử
app.post('/api/upload-history-image', uploadForHistoryImage.single('historyImage'), (req, res) => {
  if (req.file) {
    const imageUrl = `/assets/img/${req.file.filename}`;
    res.json({ imageUrl }); // Trả về URL của ảnh
  } else {
    res.status(400).json({ message: 'Không có ảnh lịch sử được upload.' });
  }
});

// Công khai thư mục public
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));


// Server listening
app.listen(5000, () => {
  console.log('Server đang chạy trên port 5000');
});
