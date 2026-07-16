import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductSlider = ({ title, products }) => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">{title}</h2>
        <div className="flex gap-2">
          {/* Custom navigation can be added here if needed */}
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id || product._id}>
            <ProductCard {...product} id={product.id || product._id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
