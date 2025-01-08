import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditChuaForm from './EditChuaForm';
import '../App.css';

const AdminDashboard = () => {
  const [chuaList, setChuaList] = useState([]);
  const [editingChua, setEditingChua] = useState(null);
  const navigate = useNavigate(); // Hook để chuyển hướng
  const SERVER_BASE_URL = 'http://localhost:5000'; 

  // Kiểm tra xác thực
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập để truy cập!');
      navigate('/dangnhap'); // Chuyển hướng đến trang đăng nhập
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/dangnhap');
  };
  // Fetch danh sách chùa
  useEffect(() => {
    axios.get(`${SERVER_BASE_URL}/api/chua`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Gửi token trong headers
      },
    })
      .then(response => setChuaList(response.data))
      .catch(error => console.error('Lỗi tải dữ liệu:', error));
  }, []);

  // Xóa chùa
  const deleteChua = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa chùa này không?");
    if (!confirmDelete) {
      return; // Dừng nếu người dùng không đồng ý
    }
    axios.delete(`${SERVER_BASE_URL}/api/chua/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Gửi token trong headers
      },
    })
      .then(() => setChuaList(chuaList.filter(chua => chua._id !== id)))
      .catch(error => console.error('Lỗi xóa dữ liệu:', error));
  };

  return (
    <div className='admin-container'>
      <h1>Quản lý Chùa</h1>
      <button className='logout' onClick={handleLogout}>Đăng xuất</button>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Hình ảnh</th>
            <th>Lịch sử</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {chuaList.map(chua => (
            <tr key={chua._id}>
              <td>{chua.name}</td>
              <td>{chua.description}</td>
              <td><img loading="lazy" src={`${SERVER_BASE_URL}${chua.image}`} alt={chua.name} width="100" /></td>
              <td>
                {chua.history.map((item, index) => (
                  <p key={index}><b>{item.title}</b></p>
                ))}
              </td>
              <td>
              {chua.googleMapUrl && (
                <div>
                  <iframe
                    src={chua.googleMapUrl}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              )}
              </td>
              <td>
                <button className='admin-button' onClick={() => setEditingChua(chua)}>Sửa</button>
                <button className='admin-button' onClick={() => deleteChua(chua._id)}>Xóa</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setEditingChua({ history: [] })}>Thêm mới</button>
      {editingChua && (
        <EditChuaForm
          chua={editingChua}
          setEditingChua={setEditingChua}
          refreshList={() => {
            axios.get(`${SERVER_BASE_URL}/api/chua`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
              .then(response => setChuaList(response.data));
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
