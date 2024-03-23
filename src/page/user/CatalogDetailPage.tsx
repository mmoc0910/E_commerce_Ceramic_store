// import { Slider } from "antd";
import Breadcrumb from "../../components/common/Breadcrumb";
// import Collapse fr/om "../../components/common/Collapse";
import Heading from "../../components/common/Heading";
import ProductItem from "../../components/product/ProductItem";
// import Checkbox from "../../components/common/CheckBox";
// import CheckBoxColor from "../../components/common/CheckBoxColor";
import { useEffect, useState } from "react";
import { CategoryType, ProductType } from "../../components/type";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import { VND_FORMAT } from "../../utils/formatPrice";

// const formatter = (value?: number) => (value ? `${VND_FORMAT(value)}` : null);
const CatalogDetailPage = () => {
  const { catalogId } = useParams();
  const [category, setCategory] = useState<CategoryType>();
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<CategoryType>(`/category/${catalogId}`);
        setCategory(result.data);
        setProducts(result.data.products.filter((item) => item.status === 1));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [catalogId]);
  if (category) {
    const { name } = category;
    return (
      <div className="container pb-20">
        <Breadcrumb
          items={[
            { title: "Trang chủ", url: "/" },
            { title: "Gian hàng", url: "/catalog" },
            { title: name },
          ]}
        />
        <div className="pt-10 space-y-10 md:space-y-24">
          <Heading>{name}</Heading>
          <div className="">
            <div className="col-span-10 md:col-span-7 lg:col-span-4">
              {products.length > 0 ? (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 gap-y-8 xl:gap-8">
                    {products.map((item) => (
                      <ProductItem key={uuidv4()} product={item} />
                    ))}
                  </div>
                </div>
              ) : (
                <p>Chưa có sản phẩm nào trong {name}</p>
              )}
            </div>
            {/* <div className="grid grid-cols-10 lg:grid-cols-5 gap-8">
              <div className="col-span-3 lg:col-span-1 hidden md:block">
                <p className="pb-5 font-medium text-center uppercase">Filter</p>
                <div className="space-y-2">
                  <Collapse title="Price">
                    <Slider
                      tooltip={{
                        formatter,
                      }}
                      range
                      defaultValue={[100000, 10000000]}
                      min={100000}
                      max={10000000}
                    />
                  </Collapse>
                  <Collapse title="Colors">
                    <div className="flex flex-wrap items-center gap-4 mr-5 gap-y-2">
                      <CheckBoxColor color="#e7e7e7" checked />
                      <CheckBoxColor color="#99AAA1" />
                      <CheckBoxColor color="#C0C9C4" />
                      <CheckBoxColor color="#4e9388" />
                      <CheckBoxColor color="#7898b2" />
                      <CheckBoxColor color="#848c92" />
                      <CheckBoxColor color="#6593a4" />
                      <CheckBoxColor color="#C0C9C4" />
                      <CheckBoxColor color="#4e9388" />
                      <CheckBoxColor color="#7898b2" />
                      <CheckBoxColor color="#848c92" />
                      <CheckBoxColor color="#6593a4" />
                    </div>
                  </Collapse>
                  <Collapse title="Size">
                    <div className="space-y-1">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Diameter</p>
                        <div className="space-y-1">
                          <Checkbox checked>5-10 cm</Checkbox>
                          <Checkbox>11-15 cm</Checkbox>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Width</p>
                        <div className="space-y-1">
                          <Checkbox checked>5-10 cm</Checkbox>
                          <Checkbox>11-15 cm</Checkbox>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Height</p>
                        <div className="space-y-1">
                          <Checkbox checked>5-10 cm</Checkbox>
                          <Checkbox>11-15 cm</Checkbox>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                  <Collapse title="Brands">
                    <div className="space-y-1">
                      <Checkbox checked>Marin</Checkbox>
                      <Checkbox>Valmo</Checkbox>
                      <Checkbox>Dala</Checkbox>
                      <Checkbox>Sol</Checkbox>
                      <Checkbox>Siren</Checkbox>
                    </div>
                  </Collapse>
                </div>
                <div className="mt-10 mr-5 space-y-5">
                  <button className="flex items-center justify-center w-full py-2 uppercase bg-simple text-aesthetic rounded-ss-3xl rounded-ee-3xl">
                    Apply
                  </button>
                  <p className="text-center underline uppercase decoration-intuitive">
                    Clear
                  </p>
                </div>
              </div>
              <div className="col-span-10 md:col-span-7 lg:col-span-4">
                {products.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                      {products.map((item) => (
                        <ProductItem key={uuidv4()} product={item} />
                      ))}
                    </div>
                    <div className="flex flex-col items-center mt-10">
                      <p className="font-medium text-center">
                        Showing 16 of 256 items
                      </p>
                      <div className="w-[300px]">
                        <Progress
                          className="mx-auto"
                          percent={10}
                          size={[300, 5]}
                          strokeColor={"#2D2D2A"}
                          showInfo={false}
                        />
                      </div>
                    </div>
                    <p className="mt-5 text-center underline uppercase decoration-intuitive">
                      load more products
                    </p>
                  </div>
                ) : (
                  <p>Chưa có sản phẩm nào trong {name}</p>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
  return;
};

export default CatalogDetailPage;
