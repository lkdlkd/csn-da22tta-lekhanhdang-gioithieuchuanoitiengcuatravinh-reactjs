import React from 'react';
import '../App.css'; 
const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h4>Địa chỉ</h4>
          <p>126 Nguyễn Thiện Thành - Khóm 4, Phường 5, Tp Trà Vinh, Tỉnh Trà Vinh</p>
        </div>
        <div className="footer-section">
          <h4>Xem thêm</h4>
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/Gioithieu">Giới thiệu</a></li>
            <li><a href="/Lienhe">Liên hệ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Liên hệ</h4>
          <p>Email:contact@example.com</p>
          <p>Điện thoại: +84 123 456 789</p>
        </div>
      </div>
      <p>&copy; Bản Quyền Thuộc TVU</p>
    </footer>
  );
};

export default Footer;
