import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import { useEffect, useState } from "react";

const SliderHome = ({
  infinite,
  numberOfActiveItems,
  autoplay,
  showIndicators,
  children,
  height,
  breakpoints,
  spaceBetween,
}) => {
  const [swiper, setSwiper] = useState(null);

  return (
    <div style={{ height }}>
      <Swiper
        spaceBetween={spaceBetween || 50}
        onSwiper={(swiper) => setSwiper(swiper)}
        style={{ width: "100%", height: "100%" }}
        pagination={showIndicators ? { clickable: true } : false}
        autoplay={autoplay ? { delay: 6000 } : false}
        loop={infinite ? true : false}
        slidesPerView={numberOfActiveItems || "auto"}
        modules={[Autoplay, Pagination]}
        breakpoints={breakpoints}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SliderHome;
