import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeftXML from "../icons/ArrowLeftXML";
import ArrowRightXML from "../icons/ArrowRightXML";
import { Autoplay, Navigation } from "swiper/modules";
import { useRef, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";

const BannerHomePage = () => {
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(1);

  return (
    <div className="w-full relative select-none">
      <div className="absolute bottom-0 right-0 left-0 z-50 py-5 flex items-center justify-center gap-5 text-white">
        <div ref={navigationPrevRef} className="cursor-pointer">
          <ArrowLeftXML />
        </div>
        <p className="text-lg">
          {activeIndex} / {2}
        </p>
        <div ref={navigationNextRef} className="cursor-pointer">
          <ArrowRightXML />
        </div>
      </div>
      <Swiper
        className="mySwiper"
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        onSlideChange={(swiper) => {
          console.log("slide change - ", swiper);
          setActiveIndex(swiper.activeIndex + 1);
        }}
        navigation={{
          nextEl: navigationNextRef.current,
          prevEl: navigationPrevRef.current,
        }}
        onSwiper={(swiper) => {
          // Delay execution for the refs to be defined
          setTimeout(() => {
            // Override prevEl & nextEl now that refs are defined
            if (swiper.params.navigation instanceof Object) {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }

            // Re-init navigation
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
      >
        <SwiperSlide>
          <div className="relative">
            <img src={banner1} className="w-full h-[500px] md:h-[650px] lg:h-[750px] xl:h-[700px] object-cover" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src={banner2} className="w-full h-[500px] md:h-[650px] lg:h-[750px] xl:h-[700px] object-cover" />
          </div>
        </SwiperSlide>
        {/* {images.map((item) => (
          <SwiperSlide key={uuidv4()}>
            <div className="relative">
              <div className="absolute inset-0 z-10 container bg-gradient-to-r from-black">
                <div className="w-1/2 flex justify-center flex-col text-aesthetic h-full">
                  <h3 className="uppercase text-5xl font-semibold tracking-wide font-secondary mb-10">
                    Ceramic store
                  </h3>
                  <p className="w-5/6 text-lg mb-5">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil, dolorum.
                  </p>
                  <button className="text-aesthetic text-lg uppercase w-fit bg-simple rounded-ss-3xl rounded-ee-3xl py-3 px-16 font-light ">Shop now</button>
                </div>
              </div>
              <img src={item} className="w-full h-[700px] object-cover" />
            </div>
          </SwiperSlide>
        ))} */}
      </Swiper>
    </div>
  );
};

export default BannerHomePage;
