import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token trong localStorage
    localStorage.removeItem('token');

    // Chuyển hướng về trang đăng nhập hoặc trang chủ
    navigate('/login'); // Hoặc '/home' nếu bạn muốn chuyển về trang chủ
  };

  return (
    <div>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
};

export default Logout;
