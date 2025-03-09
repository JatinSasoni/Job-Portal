import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const companies = [
  { logo: "/trustedCompaniesLogo/amazon.webp", name: "Company 1" },
  { logo: "/trustedCompaniesLogo/dell.webp", name: "Company 2" },
  { logo: "/trustedCompaniesLogo/sony.webp", name: "Company 3" },
  { logo: "/trustedCompaniesLogo/amazon.webp", name: "Company 1" },
  { logo: "/trustedCompaniesLogo/dell.webp", name: "Company 2" },
  { logo: "/trustedCompaniesLogo/microsoft.webp", name: "Company 3" },
  { logo: "/trustedCompaniesLogo/amazon.webp", name: "Company 1" },
  { logo: "/trustedCompaniesLogo/dell.webp", name: "Company 2" },
  { logo: "/trustedCompaniesLogo/microsoft.webp", name: "Company 3" },
];

export const TrustedCompanies = () => {
  return (
    <>
      <div>
        <Swiper
          className="dark:bg-white"
          slidesPerView={4}
          spaceBetween={5}
          loop={true}
          autoplay={{ delay: 1000 }}
          modules={[Autoplay]}
        >
          {companies.map((company, index) => (
            <SwiperSlide key={index}>
              <img
                src={company.logo}
                alt={company.name}
                className="w-32 h-20 object-contain mx-auto"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default TrustedCompanies;
