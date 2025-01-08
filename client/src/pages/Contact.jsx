import React, { useState } from 'react';
import '../App.css'; // Đảm bảo bạn đã tạo file CSS cho contact

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setIsSubmitted(false); // Khi có thay đổi trong form, reset lại trạng thái submitted
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Thông tin liên hệ đã được gửi:', formData);
    setIsSubmitted(true); // Đánh dấu form đã được gửi thành công
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h3>Thông Tin Liên Lạc</h3>
        <p><strong>Địa chỉ:</strong>126 Nguyễn Thiện Thành - Khóm 4, Phường 5, Tp Trà Vinh, Tỉnh Trà Vinh</p>
        <p><strong>Điện thoại:</strong>+84 123 456 789</p>
        <p><strong>Email:</strong>contact@example.com</p>
        <p><strong>Mạng xã hội:</strong></p>
        <ul>
          <li><a href="https://www.facebook.com/khazhdazg" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </div>
      <h2>Liên Hệ Với Chúng Tôi</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ và Tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Tin Nhắn:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Gửi</button>
      </form>
      {isSubmitted && (
        <div className="success-message">
          Cảm ơn bạn! Thông tin liên hệ của bạn đã được gửi thành công.
        </div>
      )}
    </div>
  );
};

export default Contact;
