import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import HeartXML from "../icons/HeartXML";
import SearchXML from "../icons/SearchXML";
import BagXML from "../icons/BagXML";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faBagShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import classNames from "../../utils/classNames";

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsopen] = useState<boolean>(false);
  useOnClickOutside(ref, () => setIsopen(false));
  const totalCart = cart
    .map((item) => item.amount)
    .reduce((prev, cur) => (prev += cur), 0);
  return (
    <>
      <div className="header">
        <div className="container hidden md:flex items-center justify-between py-2 text-sm bg-clear">
          <Link to={""}>Giao hàng & Thanh toán</Link>
          <Link to={""}>Tel +84 0123456789</Link>
        </div>
        <div className="container flex items-center md:gap-20 py-6">
          <div
            className="flex-1 shrink-0 md:hidden"
            onClick={() => setIsopen(true)}
          >
            <FontAwesomeIcon icon={faBars} size={"2xl"} />
          </div>
          <div className="hidden md:flex items-center gap-10 flex-1 order-2 lg:order-1">
            <Link to={"/"} className="font-medium uppercase md:hidden">
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
          <div className="md:order-1 lg:order2">
            <Logo />
          </div>
          <div className="hidden md:flex items-center lg:flex-1 gap-10 order-3">
            <div className="flex items-center flex-1 gap-4 justify-end">
              <input
                type="text"
                className="border outline-none flex-1 border-intuitive px-2 text-sm py-[3px] bg-transparent hidden lg:block"
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
          <div className="md:hidden flex-1 shrink-0 flex items-center justify-end gap-5">
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} size={"lg"} />
            </span>
            <Link to={"/favorite"}>
              <FontAwesomeIcon icon={faHeart} size={"lg"} color="#d52f42" />
            </Link>
            <Link to={"/cart"} className="relative">
              <span className="absolute -top-2 left-full text-sm font-medium">
                {totalCart}
              </span>
              <FontAwesomeIcon icon={faBagShopping} size={"lg"} />
            </Link>
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className={classNames(
          "fixed top-0 bottom-0 w-2/3 bg-light z-[100] shadow-2xl py-20 px-5 flex flex-col gap-5 transition-all duration-300",
          isOpen ? "left-0" : "-left-full"
        )}
      >
        <div onClick={() => setIsopen(false)}>
          <Link to={"/"} className="font-medium uppercase md:hidden">
            Trang chủ
          </Link>
        </div>
        <div onClick={() => setIsopen(false)}>
          <Link to={"/catalog"} className="font-medium uppercase">
            Gian hàng
          </Link>
        </div>
        <div onClick={() => setIsopen(false)}>
          <Link to={""} className="font-medium uppercase">
            Về chúng tôi
          </Link>
        </div>
        <div onClick={() => setIsopen(false)}>
          <Link to={""} className="font-medium uppercase">
            Liên hệ
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
