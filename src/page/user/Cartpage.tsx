import Heading from "../../components/common/Heading";
import Recomendation from "../../components/home/Recomendation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import CartItem from "../../components/cart/CartItem";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "../../components/common/FormGroup";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Textarea from "../../components/input/Textarea";
import { Link, useNavigate } from "react-router-dom";
import { CartState } from "../../store/cart/cartSlice";
import { api } from "../../api";
import { OrderType, ProductType } from "../../components/type";
import { VND_FORMAT } from "../../utils/formatPrice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const totalPrice = async (cart: CartState[]) => {
  try {
    const result = await Promise.all(
      cart.map(async (item) => {
        const product = await api.get<ProductType>(
          `/product/${item.productId}`
        );
        return { price: product.data.price, amount: item.amount };
      })
    );
    console.log(result);
    const totalAmount = result.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0);
    return totalAmount;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
const schema = yup
  .object({
    name: yup.string().required("Họ và tên không được để trống"),
    phone: yup.string().required("Số điện thoại không được để trống"),
    address: yup.string().required("Địa chỉ không được để trống"),
    note: yup.string(),
  })
  .required();
const Cartpage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const [totalPriceProduct, setTotalPriceProduct] = useState<number>(0);
  useEffect(() => {
    (async () => {
      setTotalPriceProduct(await totalPrice(cart));
    })();
  }, [cart]);
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: {
    name: string;
    phone: string;
    note?: string;
    address: string;
  }) => {
    try {
      const result = await api.post<OrderType>("/order", {
        ...data,
        cart: cart.map(({ productId, amount }) => ({
          product: productId,
          amount,
        })),
      });
      navigate(`/order/${result.data._id}`);
      toast.success("Đặt hàng thành công");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container pt-10 pb-20 space-y-10">
      <Heading>Giỏ hàng</Heading>
      {cart.length > 0 ? (
        <div className="grid grid-cols-10">
          <div className="col-span-6 pr-20 border-r border-r-[#ccc] space-y-12 py-5">
            {cart.length > 0 &&
              cart.map((item) => <CartItem key={uuidv4()} cart={item} />)}
          </div>
          <div className="col-span-4 pl-20 py-5 space-y-5">
            <div className="grid w-3/4 grid-cols-2 gap-y-3">
              <div className="uppercase text-lg">Tổng tiền: </div>
              <div className="font-medium text-end text-lg">
                {VND_FORMAT(totalPriceProduct)}
              </div>
              {/* <div className="flex items-center justify-between col-span-2 gap-10">
              <p className="underline uppercase cursor-pointer decoration-intuitive">
                return
              </p>
              <button className="flex items-center justify-center px-10 py-2 uppercase w-fit bg-simple text-aesthetic rounded-ss-3xl rounded-ee-3xl">
                go to order
              </button>
            </div> */}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormGroup>
                <Label htmlFor="name">Họ và tên*</Label>
                <Input name="name" control={control} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone">Số điện thoại*</Label>
                <Input name="phone" control={control} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="address">Địa chỉ*</Label>
                <Input name="address" control={control} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="note">Ghi chú</Label>
                <Textarea name="note" control={control} className="!min-h-10" />
              </FormGroup>
              <button
                type="submit"
                className="flex items-center justify-center px-10 py-3 uppercase w-full bg-simple text-aesthetic rounded-ss-3xl rounded-ee-3xl"
              >
                Đặt hàng
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p className="font-medium text-lg">
          Chưa có sản phẩm nào trong giỏ hàng{" "}
          <Link to="/" className="text-simple underline decoration-simple">
            Mua sắm ngay
          </Link>
        </p>
      )}

      <Recomendation />
    </div>
  );
};

export default Cartpage;
