import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Lỗi:', error.response?.data?.message);
    }
  };

  // Hàm để chuyển hướng đến trang đăng nhập
  const handleLoginRedirect = () => {
    navigate('/dangnhap'); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <div className='login-container'>
      <h2 className='login-title'>Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className='input-field'
            name="username"
            placeholder="Tài khoản"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className='input-field'
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='submit-button'>Đăng Ký</button>
        <p>nếu đã có tài khoản </p>
        <button type="button" className='submit-button' onClick={handleLoginRedirect}>Đăng nhập</button>
      </form>
    </div>
  );
};

export default Register;
