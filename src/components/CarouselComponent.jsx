import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const slidesData = [
  {
    companyName: 'MasterCard',
    logo: 'https://www.mastercard.us/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg'
  },
  {
    companyName: 'Google',
    logo: 'https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png'
  },
  {
    companyName: 'Amazon',
    logo: 'https://m.media-amazon.com/images/G/31/social_share/amazon_logo._CB633266945_.png'
  },
  {
    companyName: 'Byjus',
    logo: 'https://play-lh.googleusercontent.com/7Ce16xDkZW-GmTSjvcfhBFQwe67Uu79Hzr-M4JAfvvq7qX_cTPsl7TcbhFZeW3MdpUGm'
  },
  {
    companyName: 'Infosys',
    logo: 'https://cdn-ukwest.onetrust.com/logos/8d84415b-1b52-4bc4-8d5f-ca9a8eccaf8a/f7db8968-fc22-4620-92ac-dc05c5d2aa15/02460a41-565e-4cac-80a7-449bc8f77a72/logo-infosys.png'
  },
  {
    companyName: 'TCS',
    logo: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202106/tcs_logo_1200_020621101143.jpg?size=1200:675'
  },
  {
    companyName: 'Crest Data System',
    logo: 'https://media.licdn.com/dms/image/C510BAQEjnOg4U7n16w/company-logo_200_200/0/1630628290321/crest_data_systems_logo?e=2147483647&v=beta&t=iE51wgUS81Upda7Xx3ddWZZsyHJpJTD5QAIJ5k3K1iI'
  },
  {
    companyName: 'Zeus Learning',
    logo: 'https://media.licdn.com/dms/image/C4D0BAQFwl934MG1TDA/company-logo_200_200/0/1642089403387/zeus_learning_logo?e=2147483647&v=beta&t=dgZ_NF3kfW2FKpI-wSVcjx7brrC9iZ488ZvXM3TU9xc'
  },
  {
    companyName: 'Cognizant',
    logo: 'https://indiaeducationdiary.in/wp-content/uploads/2022/04/Cognizant-Logo.jpg'
  },
  {
    companyName: 'Accenture',
    logo: 'https://www.smartglobalgovernance.com/wp-content/uploads/Accenture-2.svg'
  },
  {
    companyName: 'Cybage',
    logo: 'https://media.licdn.com/dms/image/C4D0BAQEcbrcJwTB6iw/company-logo_200_200/0/1630537455951/cybage_big_data_logo?e=2147483647&v=beta&t=m8MyAsH23L-BpdCelgwEsC48xN5VJ5JsYvRAHfxG8yQ'
  },
  {
    companyName: 'Infostretch',
    logo: 'https://mms.businesswire.com/media/20210811005551/en/608648/23/Infostretch_Logo_Medium_WithoutStrapline_WhiteBG.jpg'
  },
  {
    companyName: 'Infocusp',
    logo: 'https://media.glassdoor.com/sqll/882203/infocusp-squareLogo-1638894044992.png'
  },
  {
    companyName: 'HAA Exchange',
    logo: 'https://media.licdn.com/dms/image/C4D0BAQHS0WPIgkz8qQ/company-logo_200_200/0/1631365209193?e=2147483647&v=beta&t=37qUNi4feJMQNJEYawSTJHE2T4Fx2TVxqUugfHkPKJs'
  },
  {
    companyName: 'Simform Solution',
    logo: 'https://assets.techreviewer.co/uploads/company/image/701/Simform.png'
  },
  {
    companyName: 'Streebo',
    logo: 'https://media.licdn.com/dms/image/C4D0BAQFt7cHehKsDmw/company-logo_200_200/0/1634189176170/streebo_inc_logo?e=2147483647&v=beta&t=oqMngqbuj2ha58Uf0Lo9aYfocRtyxnOEJRQ2eOV1VrA'
  },
  {
    companyName: 'TechMahindra',
    logo: 'https://yt3.googleusercontent.com/KN7T3ZjoSP8XWZfj0qZbzfyLErknBXKZrZB1P9fBnp88OJJuQ-azKZyH3nQMN1ue-SkVc-IxvLk=s900-c-k-c0x00ffffff-no-rj'
  },
  {
    companyName: 'Capgemini',
    logo: 'https://www.drupal.org/files/Capgemini_Logo_2COL_RGB.png'
  },
  {
    companyName: 'NIRMA Industries',
    logo: 'https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/b845be1e2e36c88631e68c72303eda09'
  },
  {
    companyName: 'Goldman Sachs',
    logo: 'https://logowik.com/content/uploads/images/9675-goldman.webp'
  },
  {
    companyName: 'Einfochips',
    logo: 'data:image/png;base64,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'
  },
  {
    companyName: 'Cadence',
    logo: 'data:image/png;base64,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'
  },
  {
    companyName: 'Hitachi Hirel',
    logo: 'https://media.licdn.com/dms/image/C4D0BAQEjB-A0OWxUmw/company-logo_200_200/0/1660711146139/hitachihirel_logo?e=2147483647&v=beta&t=fFpzUrxtGXTBKRpxvLv31X_Lwb4MWw48JryEepAow8k'
  },
  {
    companyName: 'Reliance Industries',
    logo: 'https://storage.googleapis.com/5paisa-prod-storage/files/2022-02/Reliance%20Industries.jpg'
  },
  {
    companyName: 'LnT Technology Service',
    logo: 'https://www.javatpoint.com/fullformpages/images/lt.png'
  },
  {
    companyName: 'Adani Power',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Adani_2012_logo.png'
  },
];

export default function CarouselComponent() {
  return (
    <>
      <Swiper
        spaceBetween={8}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={6}
      >
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index}>
              <Card className="p-4 mt-3">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">{slide.companyName}</h4>
                </CardHeader>
                <CardBody style={{ width: "100px", height: "100px", overflow: "hidden" }} className="overflow-visible py-2">
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
