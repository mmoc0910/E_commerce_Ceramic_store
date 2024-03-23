import { Link, useParams } from "react-router-dom";
import Heading from "../../components/common/Heading";
import { useEffect, useState } from "react";
import { OrderType } from "../../components/type";
import { api } from "../../api";
import { VND_FORMAT } from "../../utils/formatPrice";
import { v4 as uuidv4 } from "uuid";
import { DAY_FORMAT } from "../../constants";

const OrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderType>();
  useEffect(() => {
    if (orderId) {
      (async () => {
        try {
          const result = await api.get<OrderType>(`/order/${orderId}`);
          setOrder(result.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [orderId]);
  if (order) {
    const { address, cart, createdAt, name, note, phone } = order;
    const totalPrice = cart.reduce((total, item) => {
      return total + item.product.price * item.amount;
    }, 0);
    return (
      <div className="container pt-10 pb-20 space-y-10">
        <Heading>Thông tin đơn hàng</Heading>
        <div className="grid grid-cols-1 lg:grid-cols-10">
          <div className="col-span-6 md:pr-5 lg:pr-10 xl:pr-20 lg:border-r border-r-[#ccc] space-y-7 md:space-y-10 xl::space-y-12 py-5 order-2 lg:order-1">
            {cart.length > 0 &&
              cart.map(({ amount, product }) => (
                <div
                  className="flex items-stretch gap-3 md:gap-5 xl:gap-8 select-none"
                  key={uuidv4()}
                >
                  <Link to={`/product/${product._id}`} className="shrink-0">
                    <img
                      src={JSON.parse(product.img)[0]}
                      className="w-[120px] aspect-square object-cover rounded-ss-3xl rounded-ee-3xl"
                    ></img>
                  </Link>
                  <div className="flex flex-col justify-between flex-1">
                    <div className="">
                      <Link
                        to={`/product/${product._id}`}
                        className="xl:w-3/4 hover:underline hover:decoration-intuitive"
                      >
                        {product?.name || name}
                      </Link>
                    </div>
                    <div className="">
                      <p className="">Số lượng:</p>
                      <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                        <p>
                          {amount} x {VND_FORMAT(product.price)}
                        </p>
                        <p className="font-semibold block xl:hidden">
                          = {VND_FORMAT(product.price * amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-semibold hidden xl:block">
                      {VND_FORMAT(product.price * amount)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="col-span-4 md:pl-5 lg:pl-10 xl:pl-20 py-5 space-y-5 order-1 lg:order-2">
            <div className="grid grid-cols-5 gap-y-2 md:gap-y-3 gap-x-4">
              <div className="uppercase col-span-2 md:text-lg">Họ và tên: </div>
              <div className="col-span-3 md:text-lg">{name}</div>
              <div className="uppercase col-span-2 md:text-lg">
                Số điện thoại:{" "}
              </div>
              <div className="col-span-3 md:text-lg">{phone}</div>
              <div className="uppercase col-span-2 md:text-lg">Địa chỉ: </div>
              <div className="col-span-3 md:text-lg">{address}</div>
              <div className="uppercase col-span-2 md:text-lg">Ngày đặt: </div>
              <div className="col-span-3 md:text-lg">
                {DAY_FORMAT(createdAt)}
              </div>
              <div className="uppercase col-span-2 md:text-lg">Tổng tiền: </div>
              <div className="col-span-3 md:text-lgfont-medium">
                {VND_FORMAT(totalPrice)}
              </div>
              {note ? (
                <>
                  <div className="uppercase col-span-2 md:text-lg">
                    Ghi chú:{" "}
                  </div>
                  <div className="col-span-3 md:text-lg">{note}</div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return;
};

export default OrderPage;
