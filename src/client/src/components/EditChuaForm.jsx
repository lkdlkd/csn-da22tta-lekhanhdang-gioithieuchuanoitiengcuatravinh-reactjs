import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

const EditChuaForm = ({ chua, setEditingChua, refreshList }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '', // Hình ảnh chung cho chùa
    history: [], // Lịch sử với ảnh cho từng mục
    googleMapUrl:''
  });
  const [imageFile, setImageFile] = useState(null); // Hình ảnh chung
  const [imagePreview, setImagePreview] = useState(''); // Hiển thị ảnh chung đã chọn
  const SERVER_BASE_URL = 'http://localhost:5000'; 
  useEffect(() => {
    if (chua) {
      const historyWithImages = chua.history.map((item) => ({
        ...item,
        imageFile: item.imageFile || item.caption[0]?.img || '',
      }));
      setFormData({ ...chua, history: historyWithImages });
      setImagePreview(chua.image);
    }
  }, [chua]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHistoryChange = (index, field, value) => {
    const updatedHistory = [...formData.history];
    if (field === 'caption') {
      updatedHistory[index][field] = value.split('\n').map(content => ({ content }));
    } else {
      updatedHistory[index][field] = value;
    }
    setFormData({ ...formData, history: updatedHistory });
  };

  const handleAddHistory = () => {
    const newHistoryItem = { title: '', caption: [{ content: '' }], imageFile: null }; // Thêm trường hình ảnh vào lịch sử
    setFormData({ ...formData, history: [...formData.history, newHistoryItem] });
  };

  const handleRemoveHistory = (index) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa lịch sử này không?");
    if (!confirmDelete) {
      return; // Dừng nếu người dùng không đồng ý
    }
    const updatedHistory = formData.history.filter((_, i) => i !== index);
    setFormData({ ...formData, history: updatedHistory });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return ''; // Nếu không có hình ảnh thì không cần upload
    const formData = new FormData();
    formData.append('image', file);  

    try {
      const response = await axios.post('http://localhost:5000/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imageUrl; // server trả về URL hình ảnh
    } catch (error) {
      console.error('Lỗi upload hình ảnh:', error);
      return '';
    }
  };

  const uploadHistoryImage = async (file) => {
    if (!file) return '';
    const formData = new FormData();
    formData.append('historyImage', file);  
    try {
      const response = await axios.post('http://localhost:5000/api/upload-history-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imageUrl; // server trả về URL hình ảnh
    } catch (error) {
      console.error('Lỗi upload ảnh lịch sử:', error);
      return '';
    }
  };

  const handleHistoryImageUpload = async (index, e) => {
    const file = e.target.files[0];

    if (file) {
      console.log(file);  // Kiểm tra xem file có đúng không
      const updatedHistory = [...formData.history];
      try {
        
        const historyImageUrl = await uploadHistoryImage(file); // Đây là nơi upload ảnh lịch sử
        updatedHistory[index].caption[0].img = historyImageUrl; // Gắn ảnh lịch sử vào trường img trong caption
        updatedHistory[index].imageFile = historyImageUrl; // Cập nhật trạng thái ảnh đã upload vào item
        setFormData({ ...formData, history: updatedHistory });
      } catch (error) {
        console.error('Lỗi upload ảnh lịch sử:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form

    const confirmSave = window.confirm("Bạn có chắc chắn muốn lưu thông tin chùa này không?");
    if (!confirmSave) {
      return; // Dừng nếu người dùng không đồng ý
    }
    // Upload hình ảnh chung
    let imageUrl = formData.image;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile); 
    }

    // Upload ảnh lịch sử nếu có
    const updatedHistory = await Promise.all(formData.history.map(async (item, index) => {
      if (item.imageFile) {
        const historyImageUrl = await uploadHistoryImage(item.imageFile); // Upload ảnh lịch sử
        return { ...item, imageFile: historyImageUrl }; // Cập nhật URL ảnh lịch sử
      }
      return item;
    }));

    // Cập nhật lại formData với URL ảnh đã được upload
    const updatedFormData = {
      ...formData,
      image: imageUrl,  // Thêm hình ảnh chung vào formData
      history: updatedHistory  // Cập nhật lịch sử với URL ảnh lịch sử
    };

    const method = formData._id ? 'put' : 'post';
    const url = formData._id
      ? `http://localhost:5000/api/chua/${formData._id}`
      : 'http://localhost:5000/api/chua';

    try {
      const response = await axios[method](url, updatedFormData);
      setEditingChua(null);
      refreshList();
    } catch (error) {
      console.error('Lỗi lưu dữ liệu:', error);
    }
  };

  return (
    <div className='edit-chua-admin'>
      <h2>{formData._id ? 'Sửa Chùa' : 'Thêm Chùa'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Hình ảnh:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {imagePreview && (
            <div>
              <p>Đã chọn: {imageFile?.name}</p>
              <img
                src={`${SERVER_BASE_URL}${imagePreview}`}
                alt="preview"
                width="100"
                height="100"
              />
            </div>
          )}
        </div>
        <div>
          <label>Địa chỉ Google Maps:</label>
          <input
            type="text"
            name="googleMapUrl"
            value={formData.googleMapUrl || ''}
            onChange={handleChange}
            placeholder="Nhập URL Google Maps"
          />
        </div>


        <div>
        <h3>Lịch sử:</h3>
          {formData.history && formData.history.length > 0 ? (
            formData.history.map((historyItem, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={historyItem.title}
                  onChange={(e) => handleHistoryChange(index, 'title', e.target.value)}
                  placeholder="Tiêu đề lịch sử"
                />
                <textarea
                  value={historyItem.caption[0]?.content || ''}
                  onChange={(e) => handleHistoryChange(index, 'caption', e.target.value)}
                  placeholder="Nội dung lịch sử"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleHistoryImageUpload(index, e)}
                />
                {historyItem.imageFile && (
                  <div>
                    <p>Đã chọn: {historyItem.imageFile}</p>
                    <img src={`${SERVER_BASE_URL}${historyItem.imageFile}`} alt="preview" width="100" height="100" />
                  </div>
                )}
                <button className='admin-button' type="button" onClick={() => handleRemoveHistory(index)}>
                  Xóa lịch sử
                </button>
              </div>
            ))
          ) : (
            <p>Chưa có lịch sử nào.</p>
          )}
          <button className='admin-button' type="button" onClick={handleAddHistory}>
            Thêm lịch sử
          </button>
        </div>
        <button className='admin-button' type="submit">Lưu</button>
      </form>
    </div>
  );
};

export default EditChuaForm;
