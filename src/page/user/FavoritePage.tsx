import { useSelector } from "react-redux";
import Heading from "../../components/common/Heading";
import { RootState } from "../../store/configureStore";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ProductItem from "../../components/product/ProductItem";

const FavoritePage = () => {
  const favoriteProducts = useSelector((state: RootState) => state.fav);
  return (
    <div className="container pt-10 pb-20 space-y-10">
      <Heading>Sản phẩm yêu thích</Heading>
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 gap-y-8 xl:gap-8">
          {favoriteProducts.map((item) => (
            <ProductItem key={uuidv4()} productId={item} />
          ))}
        </div>
      ) : (
        <p>
          Chưa có sản phẩm nào được thêm{" "}
          <Link to="/" className="text-simple underline decoration-simple">
            Mua sắm ngay
          </Link>
        </p>
      )}
    </div>
  );
};

export default FavoritePage;
