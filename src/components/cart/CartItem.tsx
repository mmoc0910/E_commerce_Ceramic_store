import { Link } from "react-router-dom";
import Quantity from "../common/Quantity";
import TrashXML from "../icons/TrashXML";
import {
  CartState,
  changeAmountProduct,
  removeProductToCart,
} from "../../store/cart/cartSlice";
import React, { FC, useEffect, useState } from "react";
import { ProductType } from "../type";
import { api } from "../../api";
import { useDispatch } from "react-redux";
import { VND_FORMAT } from "../../utils/formatPrice";

type CartItemType = { cart: CartState };
const CartItem: FC<CartItemType> = React.memo(({ cart }) => {
  const { amount, image, productId, name, price } = cart;
  const dispatch = useDispatch();
  const [product, setProduct] = useState<ProductType>();
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
  useEffect(() => {
    if (product && product.status === 0) {
      dispatch(removeProductToCart(productId));
    }
  }, [dispatch, product, productId]);
  const handleRemoveCart = (_id: string) => dispatch(removeProductToCart(_id));
  return (
    <div className="flex items-stretch gap-8 select-none">
      <Link to={`/product/${productId}`}>
        <img
          src={product ? JSON.parse(product.img)[0] : image}
          className="w-[140px] aspect-square object-cover rounded-ss-3xl rounded-ee-3xl"
        ></img>
      </Link>
      <div className="flex flex-col justify-between flex-1">
        <div className="">
          <Link
            to={`/product/${productId}`}
            className="w-3/4 hover:underline hover:decoration-intuitive"
          >
            {product?.name || name}
          </Link>
          {/* <div className="w-5 h-5 mt-2 rounded-full bg-simple" /> */}
        </div>
        <div className="">
          <p className="mb-2">Số lượng</p>
          <div className="flex items-center gap-2">
            <Quantity
              size="small"
              amount={amount}
              onReduce={(value) => {
                dispatch(
                  changeAmountProduct({ productId: productId, amount: value })
                );
              }}
              onIncrease={(value) =>
                dispatch(
                  changeAmountProduct({ productId: productId, amount: value })
                )
              }
            />
            <p>
              {" "}
              x {product?.price ? VND_FORMAT(product.price) : VND_FORMAT(price)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <p className="font-semibold">
          {product?.price
            ? VND_FORMAT(product.price * amount)
            : VND_FORMAT(price * amount)}
        </p>
        <span
          className="cursor-pointer hover:text-error transition-all duration-200"
          onClick={() => handleRemoveCart(productId)}
        >
          <TrashXML />
        </span>
      </div>
    </div>
  );
});

export default CartItem;
