import { Link } from "react-router-dom";
import HeartXML from "../icons/HeartXML";
import StarXML from "../icons/StartXML";
import { ProductType } from "../type";
import { FC, useEffect, useState } from "react";
import { VND_FORMAT } from "../../utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { addFavorite, removeFavorite } from "../../store/fav/favoriteSlice";
import { CartState, addProductToCart } from "../../store/cart/cartSlice";
import { api } from "../../api";

type ProductItemProps = { product?: ProductType; productId?: string };
const ProductItem: FC<ProductItemProps> = ({ productId, ...props }) => {
  const dispatch = useDispatch();
  const listFavorite = useSelector((state: RootState) => state.fav);
  const [product, setProduct] = useState<ProductType | undefined>(
    props.product || undefined
  );
  useEffect(() => {
    if (productId) {
      (async () => {
        try {
          const result = await api.get<ProductType>(`/product/${productId}`);
          setProduct(result.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [productId]);
  const handleAddFavorite = (_id: string) => dispatch(addFavorite(_id));
  const handleRemoveFavorite = (_id: string) => dispatch(removeFavorite(_id));
  const handleAddProductToCart = (data: CartState) =>
    dispatch(addProductToCart(data));
  if (product) {
    const { name, img, price, _id } = product;
    const image = JSON.parse(img) as string[];
    const isFav = listFavorite.some((i) => i === _id);
    return (
      <div className="flex flex-col gap-2 text-sm">
        <div className="relative">
          <div
            className="absolute top-2 right-2 w-8 h-8 bg-text4 bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() =>
              isFav ? handleRemoveFavorite(_id) : handleAddFavorite(_id)
            }
          >
            <HeartXML className="!w-4 !h-4" isFav={isFav} />
          </div>
          <Link to={`/product/${_id}`}>
            <img src={image[0]} className="object-cover w-full aspect-square" />
          </Link>
        </div>
        <Link
          to={`/product/${_id}`}
          className="text-base line-clamp-2 hover:underline decoration-black transition-all duration-150"
        >
          {name}
        </Link>
        <div className="space-y-2 mt-auto">
          <div className="font-semibold mt-auto">{VND_FORMAT(price)}</div>
          <button
            onClick={() =>
              handleAddProductToCart({
                productId: _id,
                amount: 1,
                image: image[0],
                name,
                price,
              })
            }
            className="flex items-center justify-center w-full py-2 uppercase bg-simple text-aesthetic rounded-ss-3xl rounded-ee-3xl"
          >
            Add to bag
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="relative">
        <div className="absolute top-2 right-2">
          <HeartXML />
        </div>
        <Link to={"/product/:productId"}>
          <img
            src="https://images.unsplash.com/photo-1629359088562-235f543208ac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="object-cover w-full aspect-square"
          />
        </Link>
      </div>
      <Link to={"/product/:productId"} className="block text-sm line-clamp-2">
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <StarXML />
            <StarXML />
            <StarXML />
            <StarXML />
            <StarXML />
          </div>
          <span className="text-xs font-medium">(1)</span>
        </div>
        <div className="font-semibold">200.000VND</div>
      </div>
      <button className="flex items-center justify-center w-full py-2 uppercase bg-simple text-aesthetic rounded-ss-3xl rounded-ee-3xl">
        Add to bag
      </button>
    </div>
  );
};

export default ProductItem;
