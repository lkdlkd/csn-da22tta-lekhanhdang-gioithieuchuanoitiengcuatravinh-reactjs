import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(''); // Thêm state để lưu lỗi
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLoginRedirect = () => {
    navigate('/dangky'); // Chuyển hướng đến trang đăng nhập
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu dữ liệu nhập vào không trống
    if (!formData.username || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);

      if (response.data.role === 'admin') {
        navigate('/quantri'); // Nếu là admin thì chuyển đến trang quản trị
      } else {
        alert('Bạn không có quyền truy cập trang admin!');
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      setError(error.response?.data?.message || 'Lỗi khi đăng nhập, vui lòng thử lại!');
      console.error('Lỗi đăng nhập:', error.response?.data?.message);
    }
  };

  return (
    <div className='login-container'>
      <h2 className='login-title'>Đăng Nhập</h2>
      {error && <div className='error-message'>{error}</div>} {/* Hiển thị lỗi nếu có */}
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
        <button type="submit" className='submit-button'>Đăng nhập</button>
        <p>nếu chưa có tài khoản </p>
        <button type="button" className='submit-button' onClick={handleLoginRedirect}>Đăng ký</button>

      </form>
    </div>
  );
};

export default Login;
