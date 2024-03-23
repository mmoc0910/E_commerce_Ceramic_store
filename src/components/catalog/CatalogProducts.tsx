import { Link } from "react-router-dom";
import Heading from "../common/Heading";
import { useEffect, useState } from "react";
import { CategoryType } from "../type";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../api";

const CatalogProducts = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await api.get<CategoryType[]>("/category?status=1");
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="pt-5 space-y-10">
      <Heading>Products</Heading>
      {categories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
          {categories.map((item) => (
            <Link
              key={uuidv4()}
              to={`/catalog/${item._id}`}
              className="flex flex-col items-center gap-3"
            >
              <img
                src={item.img}
                className="object-cover w-full aspect-square rounded-ss-[2rem] rounded-ee-[2rem] md:rounded-ss-[3rem] mdrounded-ee-[3rem]"
              />
              <p className="uppercase text-center">{item.name}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CatalogProducts;
