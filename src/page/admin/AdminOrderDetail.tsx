import { Link, useParams } from "react-router-dom";
import { DAY_FORMAT } from "../../constants";
import { VND_FORMAT } from "../../utils/formatPrice";
import { useEffect, useState } from "react";
import { OrderType } from "../../components/type";
import { api } from "../../api";
import Heading from "../../components/common/Heading";
import { v4 as uuidv4 } from "uuid";

const AdminOrderDetail = () => {
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
      <div className="space-y-14">
        <Heading>Thông tin đơn hàng</Heading>
        <div className="grid grid-cols-10">
          <div className="col-span-6 pr-20 border-r border-r-[#ccc] space-y-10 py-5">
            {cart.length > 0 &&
              cart.map(({ amount, product }) => (
                <div
                  className="flex items-stretch gap-8 select-none"
                  key={uuidv4()}
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={JSON.parse(product.img)[0]}
                      className="w-[120px] aspect-square object-cover rounded-ss-3xl rounded-ee-3xl"
                    ></img>
                  </Link>
                  <div className="flex flex-col justify-between flex-1">
                    <div className="">
                      <Link
                        to={`/product/${product._id}`}
                        className="w-3/4 hover:underline hover:decoration-intuitive"
                      >
                        {product?.name || name}
                      </Link>
                    </div>
                    <div className="">
                      <p className="mb-2">Số lượng</p>
                      <div className="flex items-center gap-2">
                        <p>
                          {amount} x {VND_FORMAT(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-semibold">
                      {VND_FORMAT(product.price * amount)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="col-span-4 pl-14 py-5 space-y-5">
            <div className="grid grid-cols-5 gap-y-3 gap-x-4">
              <div className="uppercase col-span-2 text-lg">Họ và tên: </div>
              <div className="col-span-3 text-lg ">{name}</div>
              <div className="uppercase col-span-2 text-lg">
                Số điện thoại:{" "}
              </div>
              <div className="col-span-3 text-lg ">{phone}</div>
              <div className="uppercase col-span-2 text-lg">Địa chỉ: </div>
              <div className="col-span-3 text-lg ">{address}</div>
              <div className="uppercase col-span-2 text-lg">Ngày đặt: </div>
              <div className="col-span-3 text-lg ">{DAY_FORMAT(createdAt)}</div>
              <div className="uppercase col-span-2 text-lg">Tổng tiền: </div>
              <div className="col-span-3 text-lg font-medium">
                {VND_FORMAT(totalPrice)}
              </div>
              {note ? (
                <>
                  <div className="uppercase col-span-2 text-lg">Ghi chú: </div>
                  <div className="col-span-3 text-lg ">{note}</div>
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

export default AdminOrderDetail;
