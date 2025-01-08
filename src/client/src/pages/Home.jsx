import React, { useEffect, useState } from 'react';
import axios from '../services/axiosInstance';
import { Helmet } from 'react-helmet-async';
import ChuaCard from '../components/ChuaCard';

function Home() {
  const [chuaList, setChuaList] = useState([]);

  useEffect(() => {
    axios.get('/api/chua').then((response) => {
      setChuaList(response.data);
    });
  }, []);

  return (
    <div className='Home'>
      <Helmet>
        <title>Chùa Trà Vinh - Lịch sử và Di sản Văn hóa</title>
        <meta name="description" content="Khám phá lịch sử và di sản văn hóa của các ngôi chùa nổi tiếng tại Trà Vinh. Tìm hiểu về kiến trúc độc đáo và các lễ hội truyền thống." />
      </Helmet>
      <h2>Danh sách các ngôi chùa tại Trà Vinh</h2>
      <div className="container">
        <div className="chua-list">
          {chuaList.map(chua => (
            <ChuaCard key={chua._id} chua={chua} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
