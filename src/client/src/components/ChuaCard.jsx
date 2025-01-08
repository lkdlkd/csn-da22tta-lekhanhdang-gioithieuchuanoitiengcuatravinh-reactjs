import React from 'react';
import { Link } from 'react-router-dom';

const ChuaCard = ({ chua }) => {
  const SERVER_BASE_URL = 'http://localhost:5000'; 

  return (
    <div className='chua-card'>
      <img loading="lazy" src={`${SERVER_BASE_URL}${chua.image}`} alt={chua.name} />
      <h2>{chua.name}</h2>
      <p>{chua.description}</p>
      <Link to={`/chua/${chua._id}`}>xem thêm</Link>
    </div>
  );
};

export default ChuaCard;
