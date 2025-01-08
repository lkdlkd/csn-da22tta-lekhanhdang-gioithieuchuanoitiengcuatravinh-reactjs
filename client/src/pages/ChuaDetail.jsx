import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosInstance';
import { Helmet } from 'react-helmet-async';

function ChuaDetail() {
  const { id } = useParams();
  const [chua, setChua] = useState(null);
  const SERVER_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    axios.get(`/api/chua/${id}`)
      .then((response) => {
        setChua(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  return (
    <div className="chua-detail">
      {chua ? (
        <>
          <Helmet>
            <title>{chua.name || "Chùa"}</title>
            {chua.description && (
              <meta name="description" content={chua.description} />
            )}
          </Helmet>
          <h1>{chua.name}</h1>
          {chua.history.length > 0 ? (
            chua.history.map((section, index) => (
              <div key={index} className="section">
                {section.title && <h2>{section.title}</h2>}   {/* nếu section.title trống thì ko hiển thị thẻ h2 */}

                {section.caption && section.caption.length > 0 ? (
                  section.caption.map((item, idx) => (
                    <div key={idx} className="caption-item">
                      {item.content && <p className='content-chua'>{item.content}</p>} {/* nếu item.content trống thì ko hiển thị thẻ p */}
                      {item.img && (
                        <img
                          src={`${SERVER_BASE_URL}${item.img}`}
                          alt={`Caption ${idx}`}
                          style={{ width: '100%', height: 'auto', margin: '10px 0' }}
                          loading="lazy"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p>No history available for this section.</p>
                )}
              </div>
            ))
          ) : (
            <p>No history found for this chua.</p>
          )}
          {chua.googleMapUrl && (
            <div className="map-container">
              <h2>Địa chỉ</h2>
              <iframe
                src={chua.googleMapUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ChuaDetail;
