import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import HeartXML from "../icons/HeartXML";
import SearchXML from "../icons/SearchXML";
import BagXML from "../icons/BagXML";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const totalCart = cart
    .map((item) => item.amount)
    .reduce((prev, cur) => (prev += cur), 0);
  return (
    <div className="header">
      <div className="container flex items-center justify-between py-2 text-sm bg-clear">
        <Link to={""}>Giao hàng & Thanh toán</Link>
        <Link to={""}>Tel +84 0123456789</Link>
      </div>
      <div className="container flex items-center gap-20 py-6">
        <div className="flex items-center gap-10 flex-1">
          <Link to={"/"} className="font-medium uppercase">
            Trang chủ
          </Link>
          <Link to={"/catalog"} className="font-medium uppercase">
            Gian hàng
          </Link>
          <Link to={""} className="font-medium uppercase">
            Về chúng tôi
          </Link>
          <Link to={""} className="font-medium uppercase">
            Liên hệ
          </Link>
        </div>
        <Logo />
        <div className="flex items-center flex-1 gap-10">
          <div className="flex items-center flex-1 gap-4">
            <input
              type="text"
              className="border outline-none flex-1 border-intuitive px-2 text-sm py-[3px] bg-transparent"
            />
            <div className="">
              <SearchXML />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to={"/favorite"}>
              <HeartXML />
            </Link>
            <Link to={"/cart"} className="relative">
              <span className="absolute -top-2 left-full text-sm font-medium">
                {totalCart}
              </span>
              <BagXML />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
