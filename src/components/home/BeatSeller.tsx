import { Link } from "react-router-dom";
import Heading from "../common/Heading";
import ProductItem from "../product/ProductItem";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { ProductType } from "../type";
import { api } from "../../api";

const BeatSeller = () => {
  const [listProduct, setListProduct] = useState<ProductType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<ProductType[]>("/product?status=1");
        setListProduct(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  if (listProduct.length > 0)
    return (
      <div className="pt-20 pb-0 space-y-10">
        <Heading>BestSeller</Heading>
        <div className="grid grid-cols-5 gap-8">
          {listProduct.map((item) => (
            <ProductItem key={uuidv4()} product={item} />
          ))}
        </div>
        <Link
          to={""}
          className="block text-center underline uppercase decoration-black"
        >
          view all products
        </Link>
      </div>
    );
  return;
};

export default BeatSeller;
