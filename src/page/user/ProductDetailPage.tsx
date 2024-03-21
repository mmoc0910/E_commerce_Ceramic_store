import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import Quantity from "../../components/common/Quantity";
import Recomendation from "../../components/home/Recomendation";
import HeartXML from "../../components/icons/HeartXML";
import ProductPictureSwiper from "../../components/product/ProductPictureSwiper";
import { useEffect, useState } from "react";
import { ProductType } from "../../components/type";
import { api } from "../../api";
import { VND_FORMAT } from "../../utils/formatPrice";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { addFavorite, removeFavorite } from "../../store/fav/favoriteSlice";
import { CartState, addProductToCart } from "../../store/cart/cartSlice";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const listFavorite = useSelector((state: RootState) => state.fav);
  const handleAddFavorite = (_id: string) => dispatch(addFavorite(_id));
  const handleRemoveFavorite = (_id: string) => dispatch(removeFavorite(_id));
  const [product, setProduct] = useState<ProductType>();
  const [amount, setAmount] = useState<number>(1);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<ProductType>(`/product/${productId}`);
        setProduct(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [productId]);
  const handleAddProductToCart = (data: CartState) =>
    dispatch(addProductToCart(data));
  if (product) {
    const { name, price, content, description, img, _id } = product;
    const images = JSON.parse(img) as string[];
    const isFav = listFavorite.some((i) => i === _id);
    return (
      <div className="container pb-20">
        <Breadcrumb
          items={[
            { title: "Home", url: "/" },
            { title: "Catalog", url: "/catalog" },
            { title: "cups", url: "/catalog/cups" },
            { title: name },
          ]}
        />
        <div className="grid grid-cols-10 gap-10 pt-8">
          <div className="col-span-6">
            <ProductPictureSwiper images={images} />
          </div>
          <div className="w-3/4 col-span-4 space-y-4 select-none">
            <h1 className="text-2xl">{name}</h1>
            <p className="text-2xl">{VND_FORMAT(price)}</p>
            <div className="grid w-3/4 grid-cols-2 gap-y-10">
              <div className="self-center col-span-1 text-sm font-medium uppercase">
                Số lượng
              </div>
              <Quantity
                amount={amount}
                onReduce={(value) => setAmount(value)}
                onIncrease={(value) => setAmount(value)}
              />
              <div className="self-center col-span-1 text-sm font-medium uppercase">
                Màu sắc
              </div>
              <div className="">
                <div className="w-5 h-5 rounded-full bg-simple" />
              </div>
            </div>
            <div className="flex items-center w-3/4 gap-5 pt-5">
              <button
                onClick={() =>
                  handleAddProductToCart({
                    productId: _id,
                    amount,
                    image: images[0],
                    name,
                    price,
                  })
                }
                className="flex items-center justify-center w-full py-3 uppercase bg-simple text-aesthetic rounded-ss-3xl rounded-ee-3xl"
              >
                Thêm giỏ hàng
              </button>
              <span
                className="cursor-pointer"
                onClick={() =>
                  isFav ? handleRemoveFavorite(_id) : handleAddFavorite(_id)
                }
              >
                <HeartXML isFav={isFav} />
              </span>
            </div>
            <div className="pt-5">{description}</div>
          </div>
          <div className="col-span-6">
            <div className="flex items-center gap-20 py-10">
              <div className="underline uppercase text-lg font-medium decoration-intuitive">
                Chi tiết sản phẩm
              </div>
              <div className="uppercase text-lg font-medium decoration-intuitive">
                Vận chuyển và hoàn trả
              </div>
            </div>
            <div className="product-content">
              {parse(content)}
              {/* <div className="space-y-3">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quaerat repudiandae nulla voluptas quidem dolor libero saepe
                  error dolore incidunt provident quibusdam nihil porro,
                  deserunt reprehenderit sint. Neque ratione placeat harum?
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                  omnis possimus repudiandae quibusdam, quas placeat unde
                  accusantium impedit vero quae, beatae asperiores, consequatur
                  doloribus sed laborum alias architecto illum quasi?
                </p>
              </div>
              <div className="w-3/4 mt-5 space-y-3">
                <div className="flex items-center">
                  <div className="flex-1 font-medium">Weight</div>
                  <div className="flex-1 font-medium">400 g</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 font-medium">Brabds</div>
                  <div className="flex-1 font-medium">Marin</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 font-medium">Material</div>
                  <div className="flex-1 font-medium">Việt Nam</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 font-medium">Diameter</div>
                  <div className="flex-1 font-medium">11.5 cm</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 font-medium">Weight</div>
                  <div className="flex-1 font-medium">400 g</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 font-medium">Weight</div>
                  <div className="flex-1 font-medium">400 g</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 font-medium">Weight</div>
                  <div className="flex-1 font-medium">400 g</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 font-medium">Weight</div>
                  <div className="flex-1 font-medium">400 g</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 font-medium">Weight</div>
                  <div className="flex-1 font-medium">400 g</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <Recomendation />
      </div>
    );
  }
  return;
};

export default ProductDetailPage;
