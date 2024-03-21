import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import Heading from "../../components/common/Heading";
import { useEffect, useState } from "react";
import { CategoryType } from "../../components/type";
import { api } from "../../api";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const CategoryPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const result = await api.get<CategoryType[]>("category?status=1");
      setCategories(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveCategory = async (category: CategoryType) => {
    try {
      setLoading(true);
      const { isConfirmed } = await MySwal.fire({
        title: (
          <p className="font-primary text-3xl font-semibold">
            Bạn có muốn xóa danh mục{" "}
            <span className="text-simple">{category.name}</span>
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
        await api.delete(`/category/${category._id}`);
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <Heading className="text-lg text-start">Danh mục sản phẩm</Heading>
        <Button href="/admin/category/add" className="px-7">
          Thêm mới
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-x-10 gap-y-20">
        {categories.length > 0 &&
          categories.map((category) => (
            <div className="space-y-3">
              <Link
                to={`/admin/category/${category._id}`}
                key={uuidv4()}
                className="flex flex-col items-center gap-4"
              >
                <img
                  src={category.img}
                  className="object-cover w-full aspect-square rounded-ss-[3rem] rounded-ee-[3rem]"
                />
                <p className="uppercase">{category.name}</p>
              </Link>
              <div className="flex items-center gap-5">
                <Link
                  to={`/admin/category/edit/${category._id}`}
                  className="text-aesthetic text-base uppercase bg-simple rounded-ss-2xl rounded-ee-2xl py-3 flex-1 font-light flex items-center justify-center"
                >
                  Chỉnh sửa
                </Link>
                <button
                  onClick={() => handleRemoveCategory(category)}
                  className="text-aesthetic text-base uppercase bg-simple rounded-ss-2xl rounded-ee-2xl py-3 flex-1 font-light flex items-center justify-center"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
      </div>
      {loading && categories.length === 0 ? (
        <div className="w-full h-40 flex items-center justify-center">
          <div className="w-7 h-7 rounded-full border-2 border-simple border-r-transparent animate-spin" />
        </div>
      ) : null}
    </div>
  );
};

export default CategoryPage;
