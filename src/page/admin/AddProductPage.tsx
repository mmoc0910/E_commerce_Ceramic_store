import "react-quill/dist/quill.snow.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/common/Heading";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import FormGroup from "../../components/common/FormGroup";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Textarea from "../../components/input/Textarea";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { imgbbAPI } from "../../constants";
import Button from "../../components/button/Button";
import Loading from "../../components/common/Loading";
import TrashXML from "../../components/icons/TrashXML";
import { uploadImage } from "../../utils/uploadImage";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../api";
import { ProductType } from "../../components/type";

Quill.register("modules/imageUploader", ImageUploader);
const modules = {
  toolbar: [
    ["italic", "bold", "underline"],
    ["link", "image"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
  ],
  imageUploader: {
    upload: async (file: File) => {
      try {
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        const response = await axios({
          method: "post",
          url: imgbbAPI,
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data.data.url;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
const schema = yup
  .object({
    name: yup.string().required("Tên sản phẩm không được để trống"),
    price: yup
      .number()
      .positive()
      .integer()
      .required("Gía sản phẩm không được để trống"),
    description: yup.string().required("Mô tả sản phẩm không được để trống"),
    content: yup.string().required("Nội dung sản phẩm không được để trống"),
  })
  .required();
const AddProductPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const contentWatch = watch("content");
  const onSubmit = async (data: {
    name: string;
    price: number;
    description: string;
    content: string;
  }) => {
    try {
      setLoading(true);
      if (images.length > 0) {
        const listImage: string[] = await Promise.all(
          images.map(async (item) => {
            const img = await uploadImage(item);
            return img;
          })
        );
        const result = await api.post<ProductType>("/product", {
          ...data,
          img: JSON.stringify(listImage),
        });
        await api.put(`/category/add-product/${categoryId}`, {
          listId: [result.data._id],
        });
        navigate(`/admin/category/${categoryId}`);
        toast.success("Thêm sản phẩm thành công");
      } else {
        toast.warn("Bạn chưa chọn hình ảnh cho sản phẩm");
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
        <Heading className="text-lg text-start">Thêm sản phẩm</Heading>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-5 gap-10"
        >
          <div className="col-span-2">
            <FormGroup>
              <Label htmlFor="name">Hình ảnh*</Label>
              <div className="grid grid-cols-4 gap-4">
                {images &&
                  images.map((item) => (
                    <div className="relative" key={uuidv4()}>
                      <img
                        src={URL.createObjectURL(item)}
                        className="h-full aspect-square rounded-ss-3xl rounded-ee-3xl object-cover"
                      />
                      <div
                        className="absolute inset-0 z-10 rounded-ss-3xl rounded-ee-3xl flex items-center justify-center group hover:opacity-100 opacity-0 transition-all duration-200 cursor-pointer bg-[#00000060]"
                        onClick={() =>
                          setImages((prev) =>
                            prev.filter((i) => i.name !== item.name)
                          )
                        }
                      >
                        <span className="text-white ">
                          <TrashXML />
                        </span>
                      </div>
                    </div>
                  ))}

                <label htmlFor="image" className="block cursor-pointer">
                  <div className="w-full aspect-square border-2 border-dashed border-black rounded-ss-3xl rounded-ee-3xl flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      setImages((prev) => [...prev, ...files]);
                    }
                  }}
                />
              </div>
            </FormGroup>
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-10">
            <FormGroup>
              <Label htmlFor="name">Tên sản phẩm*</Label>
              <Input name="name" control={control} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Giá*</Label>
              <Input name="price" control={control} type="number" />
            </FormGroup>
            <FormGroup className="col-span-2">
              <Label htmlFor="name">Mô tả*</Label>
              <Textarea name="description" control={control} />
            </FormGroup>
          </div>
          <FormGroup className="col-span-5">
            <Label>Nội dung*</Label>
            {errors.content?.message ? (
              <p className="text-base text-error bg-white dark:bg-dark-secondary leading-none translate-y-[2px] line-clamp-1 mr-5">
                {errors.content.message}
              </p>
            ) : null}

            <ReactQuill
              // placeholder="Write your content......"
              modules={modules}
              theme="snow"
              value={contentWatch}
              onChange={(value) => setValue("content", value)}
            />
          </FormGroup>
          <Button type="submit" className="col-span-5">
            Thêm mới
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddProductPage;
