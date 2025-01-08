import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Thumbs } from 'swiper/modules';

const About = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Danh sách ảnh
  const images = [
    "/assets/image/1631311208-tra-vinh.jpg",
    "/assets/image/anh1.jpg",
    "/assets/image/anh2.jpg",
    "/assets/image/anh3.jpg",
    "/assets/image/anh4.jpg",
  ];
  const [showVideo, setShowVideo] = useState(false); // Trạng thái hiển thị video

  // Hàm bật/tắt video
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="About">
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="main-slider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Ảnh ${index + 1}`}
              style={{ width: '100%', height: '450px',cursor: 'pointer', borderRadius: '5px' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper con hiển thị ảnh nhỏ */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="thumbnail-slider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Ảnh thu nhỏ ${index + 1}`}
              style={{ width: '100%', height: '150px', cursor: 'pointer', borderRadius: '5px' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Nút hiển thị video */}
      <button onClick={toggleVideo} className='btn-about'>
        {showVideo ? 'Đóng video' : 'Xem video'}
      </button>
      
      {/* Hiển thị video nếu showVideo === true */}
      {showVideo && (
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/ZWNSnnIAVjk?list=PL3FCWYy55miHmV2Vy6hOkNFa8204XE8JW"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ marginTop: '20px' }}
        ></iframe>
      )}

      <h2>Giới thiệu về Trà Vinh</h2>
      <div className="content">
      <p>
      Trà Vinh là tỉnh Duyên hải Đồng bằng sông Cửu Long, tiếp giáp với các tỉnh Bến Tre, Vĩnh Long, Sóc Trăng; nằm giữa sông Tiền và 
      sông Hậu. Trung tâm tỉnh lỵ Trà Vinh cách thành phố Hồ Chí Minh 130 km và thành phố Cần Thơ 100 km. Tỉnh Trà Vinh có 01 thành phố,
       01 thị xã và 07 huyện gồm: Thành phố Trà Vinh, thị xã Duyên Hải và các huyện Càng Long, Châu Thành, Tiểu Cần, Cầu Kè, Trà Cú, Cầu
        Ngang, Duyên Hải. Diện tích tự nhiên 2.341 km2, dân số trên 1,1 triệu người với 03 dân tộc chính là Kinh, Khmer, Hoa, trong đó 
        dân tộc Khmer chiếm 30% dân số. Với trị trí tiếp giáp biển Đông chiều dài 65 km bờ biển đã hình thành nên vùng đất Trà Vinh gồm
         vùng đất châu thổ lâu đời, bên cạnh vùng đất trẻ mới bồi và mạng lưới sông ngòi chằng chịt mang nặng phù sa, bồi đắp cho những 
         vườn cây ăn trái. Trà Vinh là tỉnh mưa thuận, gió hoà, nhiệt độ trung bình từ 26 – 27 độ C, hiếm khi có bão, vì thế bất cứ mùa 
         nào trong năm du khách cũng có thể đến miền Duyên hải này.
      </p>
      <p>
         Trà Vinh được đánh giá là một trong những tỉnh có tiềm năng phong phú về du lịch văn hóa, lịch sử, du lịch biển, sông nước miệt vườn, các cồn nổi ven biển chuyên canh vườn cây ăn trái đặc sản…đặc biệt là du lịch khám phá bản sắc văn hóa của vùng đất gắn bó lâu đời của ba dân tộc Kinh, Khmer, Hoa với 143 ngôi chùa Khmer có kiến trúc độc đáo trãi khắp các huyện, thị xã, thành phố trong tỉnh và các lễ hội mang đậm nét văn hóa dân tộc diễn ra quanh năm.
      </p>
      <p>
          Tỉnh Trà Vinh đã và đang được sự quan tâm của Chính phủ với các dự án đầu tư lớn đã triển khai như: Dự án xây dựng cầu Cổ Chiên, nâng cấp các Quốc lộ 53, 54, 60, Luồng cho tàu biển có trọng tải lớn vào sông Hậu (kênh đào Trà Vinh), Khu kinh tế Định An, Trung tâm điện lực Duyên Hải…, tạo điều kiện cho Trà Vinh khắc phục hạn chế về mặt địa lý trở thành cửa ngõ giao thương quan trọng của khu vực Đồng bằng sông Cửu Long đến các khu vực khác trong nước và trên thế giới bằng đường thủy, tạo động lực mới trong phát triển kinh tế địa phương.
      </p>
      <p>
      Tạo môi trường đầu tư thông thoáng, minh bạch, điểm đầu tư đáng tin cậy cho doanh nghiệp, nhà đầu tư” là một trong những ưu tiên hàng đầu của Lãnh đạo tỉnh. Bên cạnh các chính sách ưu đãi đầu tư chung, nhà đầu tư khi triển khai dự án du lịch trên địa bàn tỉnh còn được hưởng các chính sách ưu đãi riêng của địa phương.
      </p>
      <p>
      Người Trà Vinh hồn nhiên, thật thà và mến khách, chính sự thân thiện ấy đã tạo được những ấn tượng tốt đẹp trong lòng du khách, các nhà đầu tư, doanh nghiệp trong và ngoài nước khi đến với quê hương Trà Vinh.
      </p>
      </div>
      
    </div>
  );
};

export default About;
