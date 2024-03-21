import { useEffect, useMemo, useState } from "react";
import Heading from "../../components/common/Heading";
import { OrderType } from "../../components/type";
import { api } from "../../api";
import { Table, TableColumnsType } from "antd";
import { VND_FORMAT } from "../../utils/formatPrice";
import { DAY_FORMAT } from "../../constants";
import { Link } from "react-router-dom";

const AdminOrderPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [listOrder, setListOrder] = useState<OrderType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await api.get<OrderType[]>("/order");
        setListOrder(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const columns: TableColumnsType<OrderType> = useMemo(
    () => [
      {
        title: () => <p className="font-semibold font-primary text-sm"></p>,
        dataIndex: "index",
        key: "index",
        width: 50,
        fixed: "left",
        render: (text: string, record: OrderType) => (
          <Link
            to={`/admin/order/${record._id}`}
            className="text-sm font-primary text-[#3d6dae]"
          >
            {text + 1}
          </Link>
        ),
      },
      {
        title: () => (
          <p className="font-semibold font-primary text-sm">Họ và tên</p>
        ),
        dataIndex: "name",
        key: "name",
        render: (text: string, record: OrderType) => (
          <Link
            to={`/admin/order/${record._id}`}
            className="text-sm font-primary text-[#3d6dae]"
          >
            {text}
          </Link>
        ),
      },
      {
        title: () => (
          <p className="font-semibold font-primary text-sm">Số điện thoại</p>
        ),
        dataIndex: "phone",
        key: "phone",
        render: (text: string) => (
          <p className="text-sm font-primary">{text}</p>
        ),
      },
      {
        title: () => (
          <p className="font-semibold font-primary text-sm">Địa chỉ</p>
        ),
        dataIndex: "address",
        key: "address",
        render: (text: string) => (
          <p className="text-sm font-primary">{text}</p>
        ),
      },
      {
        title: () => (
          <p className="font-semibold font-primary text-sm">Ghi chú</p>
        ),
        dataIndex: "note",
        key: "note",
        render: (text: string) => (
          <p className="text-sm font-primary line-clamp-2">{text}</p>
        ),
      },
      {
        title: () => (
          <p className="font-semibold font-primary text-sm">Tổng sản phẩm</p>
        ),
        key: "totalProduct",
        render: (_text: string, record: OrderType) => {
          const totalAmount = record.cart.reduce(
            (accumulator, currentItem) => accumulator + currentItem.amount,
            0
          );
          return (
            <p className="text-sm font-primary line-clamp-2">{totalAmount}</p>
          );
        },
      },
      {
        title: () => (
          <p className="font-semibold font-primary text-sm">Tổng tiền</p>
        ),
        key: "totalMoney",
        render: (_text: string, record: OrderType) => {
          const totalPrice = record.cart.reduce(
            (accumulator, currentItem) =>
              accumulator + currentItem.amount * currentItem.product.price,
            0
          );
          return (
            <p className="text-sm font-primary line-clamp-2">
              {VND_FORMAT(totalPrice)}
            </p>
          );
        },
      },
      {
        title: () => (
          <p className="font-semibold font-primary text-sm">Ngày đặt</p>
        ),
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text: Date) => (
          <p className="text-sm font-primary line-clamp-2">
            {DAY_FORMAT(text)}
          </p>
        ),
      },
    ],
    []
  );
  return (
    <div className="space-y-10">
      <Heading className="text-lg text-start">Danh sách đơn hàng</Heading>
      <div className="rounded-xl border-2 border-[#eeeeed] overflow-hidden">
        <Table
          dataSource={listOrder.map((item, index) => ({ ...item, index }))}
          columns={columns}
          loading={loading}
          //   scroll={{ x: 1600 }}
        />
      </div>
    </div>
  );
};

export default AdminOrderPage;
