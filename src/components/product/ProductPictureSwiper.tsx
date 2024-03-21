import { useState } from "react";
import Swiper from "swiper";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

type ProductPictureSwiper = { images: string[] };
const ProductPictureSwiper: React.FC<ProductPictureSwiper> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  return (
    <div className="w-full">
      <SwiperReact
        loop={true}
        spaceBetween={20}
        grabCursor={true}
        modules={[Navigation, Thumbs]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="mb-5 rounded-ss-[3rem] rounded-ee-[3rem]"
      >
        {images &&
          images.map((item) => (
            <SwiperSlide key={uuidv4()}>
              <div className="relative w-full h-0 pb-[75%] cursor-pointer select-none">
                <img
                  src={item}
                  alt=""
                  className="absolute inset-0 object-cover w-full h-full rounded-ss-[3rem] rounded-ee-[3rem]"
                />
              </div>
            </SwiperSlide>
          ))}
      </SwiperReact>
      <SwiperReact
        // loop={true}
        spaceBetween={15}
        slidesPerView={4}
        modules={[Navigation, Thumbs]}
        onSwiper={(swiper) => {
          setThumbsSwiper(swiper);
        }}
        className="product-pictures-thumbs"
      >
        {images &&
          images.map((item) => (
            <SwiperSlide key={uuidv4()}>
              <div className="relative w-full h-0 pb-[75%] cursor-pointer select-none">
                <img
                  src={item}
                  alt=""
                  className="absolute inset-0 object-cover w-full h-full rounded-ss-3xl rounded-ee-3xl"
                />
              </div>
            </SwiperSlide>
          ))}
      </SwiperReact>
    </div>
  );
};

export default ProductPictureSwiper;

// import { useState } from "react";
// import Swiper from "swiper";
// import { Navigation, Thumbs } from "swiper/modules";
// import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
// import { v4 as uuidv4 } from "uuid";

// const images: string[] = [
//   "https://images.unsplash.com/photo-1633000116322-d7f5cb7d3ebb?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1629359088562-235f543208ac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1631125915800-4008fc1072ec?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

// const ProductPictureSwiper: React.FC = () => {
//   const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
//   return (
//     <div className="flex flex-col w-full h-full gap-5 overflow-hidden">
//       <div className="w-full h-2/3">
//         <SwiperReact
//           loop={true}
//           spaceBetween={20}d
//           modules={[Navigation, Thumbs]}
//           thumbs={{
//             swiper:
//               thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
//           }}
//           className="w-full h-full mb-5 rounded-bl-[3rem] rounded-tr-[3rem]"
//         >
//           {images &&
//             images.map((item) => (
//               <SwiperSlide key={uuidv4()}>
//                 <img
//                   src={item}
//                   alt=""
//                   className="object-cover w-full -rotate-90 aspect-square rounded-tl-[3rem] rounded-br-[3rem]"
//                 />
//               </SwiperSlide>
//             ))}
//         </SwiperReact>
//       </div>
//       <div className="h-1/3">
//         <SwiperReact
//           loop={true}
//           spaceBetween={15}
//           slidesPerView={3}
//           modules={[Navigation, Thumbs]}
//           onSwiper={(swiper) => {
//             setThumbsSwiper(swiper);
//           }}
//           className="product-pictures-thumbs"
//         >
//           {images &&
//             images.map((item) => (
//               <SwiperSlide key={uuidv4()}>
//                 <img
//                   src={item}
//                   alt=""
//                   className="object-cover w-full h-full rounded-ss-3xl rounded-ee-3rounded-ss-3xl"
//                 />
//               </SwiperSlide>
//             ))}
//         </SwiperReact>
//       </div>
//     </div>
//   );
// };

// export default ProductPictureSwiper;
