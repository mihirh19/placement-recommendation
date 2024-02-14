import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { slidesData } from '@/data/CrouselCompany';
import { useWindowSize } from "@uidotdev/usehooks";

export default function CarouselComponent() {
    const screenSize = useWindowSize();

  return (
    <>
      <Swiper
        spaceBetween={50}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className={"mySwiper"}
        slidesPerView={screenSize.width> 768 ? 6 : 2}
      >
        <div className="gap-4 lg:grid">
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index} className='pb-8 m-4'>
              <Card className="p-2 mt-3 mb-3">
                <CardHeader className="pb-0 pt-5 flex-col items-start">
                  <h4 className="font-bold text-medium">{slide.companyName}</h4>
                </CardHeader>
                <CardBody className="py-2 w-24 h-24 overflow-hidden">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={slide.logo}
                    width={270}
                    height={300}
                  />
                </CardBody>
              </Card>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

    </>
  );
}
