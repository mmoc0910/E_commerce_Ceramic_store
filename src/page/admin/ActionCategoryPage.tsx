import Heading from "../../components/common/Heading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import FormGroup from "../../components/common/FormGroup";
import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../../api";
import Loading from "../../components/common/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryType } from "../../components/type";
import { uploadImage } from "../../utils/uploadImage";

const schema = yup
  .object({
    name: yup.string().required("Không được để trống tên danh mục"),
  })
  .required();

const ActionCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<FileList | undefined>(undefined);
  const { handleSubmit, control, setValue } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (categoryId) {
      (async () => {
        try {
          const result = await api.get<CategoryType>(`/category/${categoryId}`);
          setCategory(result.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [categoryId]);
  useEffect(() => {
    if (categoryId && category) {
      setValue("name", category.name);
    }
  }, [categoryId, category, setValue]);
  const onSubmit = async (data: { name: string }) => {
    try {
      setLoading(true);
      console.log(data);
      if (categoryId && category) {
        let img = category.img;
        if (images) {
          img = await uploadImage(images[0]);
        }
        await api.put(`/category/${category._id}`, {
          ...data,
          img,
        });
        navigate("/admin/category");
        toast.success("Chỉnh sửa danh mục thành công");
      } else {
        if (!images) {
          toast.warn("Bạn chưa chọn ảnh");
        } else {
          const img = await uploadImage(images[0]);
          console.log(img);
          await api.post("/category", {
            ...data,
            img,
          });
          navigate("/admin/category");
          toast.success("Thêm danh mục thành công");
        }
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
    <>
      {loading ? <Loading /> : null}
      <div className="space-y-10">
        <Heading className="text-start text-lg"> {categoryId && category ? "Chỉnh sửa" : "Thêm"} danh mục</Heading>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-10"
        >
          <FormGroup>
            <Label htmlFor="name">Tên danh mục*</Label>
            <Input name="name" control={control} />
          </FormGroup>
          <FormGroup>
            <Label>Hình ảnh*</Label>
            <div className="">
              <label htmlFor="image" className="block cursor-pointer w-2/4">
                {category && categoryId ? (
                  <>
                    {images && images?.length > 0 ? (
                      <img
                        src={URL.createObjectURL(images[0])}
                        className="h-full aspect-square rounded-ss-[3rem] rounded-ee-[3rem] object-cover"
                      />
                    ) : (
                      <img
                        src={category.img}
                        className="h-full aspect-square rounded-ss-[3rem] rounded-ee-[3rem] object-cover"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {!images ? (
                      <div className="w-full aspect-square border-2 border-dashed border-black rounded-ss-[3rem] rounded-ee-[3rem] flex items-center justify-center">
                        <p className="w-full text-center font-secondary">
                          Choose your Image
                        </p>
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(images[0])}
                        className="h-full aspect-square rounded-ss-[3rem] rounded-ee-[3rem] object-cover"
                      />
                    )}
                  </>
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image"
                onChange={(e) => e.target.files && setImages(e.target.files)}
              />
            </div>
          </FormGroup>
          <Button type="submit">
            {categoryId && category ? "Chỉnh sửa" : "Thêm mới"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default ActionCategoryPage;
