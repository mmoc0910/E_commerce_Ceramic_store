import { useEffect, useState } from "react";
import { api } from "../../api";
import Heading from "../../components/common/Heading";
import { CategoryType, ProductType } from "../../components/type";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { VND_FORMAT } from "../../utils/formatPrice";
import { v4 as uuidv4 } from "uuid";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const MySwal = withReactContent(Swal);
const CategoryDetailPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<CategoryType>();
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    if (categoryId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);
  const fetchData = async () => {
    try {
      const result = await api.get<CategoryType>(`/category/${categoryId}`);
      setCategory(result.data);
      setProducts(result.data.products.filter((item) => item.status === 1));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteProduct = async (_id: string, product_name: string) => {
    try {
      const { isConfirmed } = await MySwal.fire({
        title: (
          <p className="font-primary text-3xl font-semibold">
            Bạn có muốn xóa sản phẩm{" "}
            <span className="text-simple">{product_name}</span>
          </p>
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1DC071",
        cancelButtonColor: "#d33",
        cancelButtonText: "Thoát",
        confirmButtonText: "Đồng ý",
      });
      if (isConfirmed) {
        await api.delete(`/product/${_id}`);
        fetchData();
        toast.success("Xoá thành công");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error);
        toast.error(JSON.stringify(error.response?.data.message));
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  };
  if (category) {
    return (
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <Heading className="text-lg text-start">{category.name}</Heading>
          <Button href={`/admin/category/product/add/${category._id}`}>
            Thêm sản phẩm
          </Button>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-10 gap-y-14">
            {products.map((item) => {
              const { _id, name, price, img } = item;
              const image = JSON.parse(img) as string[];
              return (
                <div className="flex flex-col gap-2 text-sm" key={uuidv4()}>
                  <Link
                    to={`/admin/category/${categoryId}/product/edit/${_id}`}
                  >
                    <img
                      src={image[0]}
                      className="object-cover w-full aspect-square"
                    />
                  </Link>
                  <Link
                    to={`/admin/category/${categoryId}/product/edit/${_id}`}
                    className="block text-base line-clamp-2 hover:underline decoration-black transition-all duration-150"
                  >
                    {name}
                  </Link>
                  <div className="space-y-2 mt-auto">
                    <div className="font-semibold">{VND_FORMAT(price)}</div>
                    <button className="flex items-center justify-center w-full py-2 uppercase bg-simple text-aesthetic rounded-ss-3xl rounded-ee-3xl" onClick={() => handleDeleteProduct(_id,name )}>
                      Xóa sản phẩm
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Chưa có sản phẩm nào được thêm</p>
        )}
      </div>
    );
  }
  return;
};

export default CategoryDetailPage;
