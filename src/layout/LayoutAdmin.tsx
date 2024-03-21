import { NavLink, Outlet } from "react-router-dom";
import Logo from "../components/logo/Logo";
import classNames from "../utils/classNames";
import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

const menu = [
  { to: "/admin/category", title: "Danh mục & sản phẩm" },
  { to: "/admin/order", title: "Đơn hàng" },
];

const LayoutAdmin = () => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsopen(false));
  return (
    <div className="grid grid-cols-12 w-full h-screen bg-[#fff]">
      <div
        ref={ref}
        className={classNames(
          "col-span-2 rounded-tr-3xl rounded-br-3xl transition-all duration-300 fixed top-0 bottom-0 w-4/6 md:w-1/3 z-20 xl:left-0 xl:right-0 xl:w-full xl:block xl:relative h-full overflow-hidden bg-center bg-cover bg-[url(https://images.unsplash.com/photo-1604095616439-216735abec0c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]",
          isOpen ? "left-0" : "-left-full"
        )}
      >
        <div className="absolute inset-0 bg-black xl:bg-opacity-60" />
        <div className="absolute w-full z-5 h-full py-10 px-5 ">
          <Logo />
          <div className="flex flex-col gap-5 pt-28">
            {menu.map((item) => {
              return (
                <div
                  className="w-full"
                  onClick={() => setIsopen(false)}
                  key={uuidv4()}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        "font-secondary uppercase font-medium",
                        isActive ? "text-white" : "text-simple"
                      )
                    }
                    key={uuidv4()}
                  >
                    {item.title}
                  </NavLink>
                </div>
              );
            })}
            <div
              className={classNames(
                "hover:bg-[#403f3f] px-4 py-3 rounded-lg transition-all duration-200 text-icon-color block md:hidden"
              )}
            >
              Đăng xuất
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 xl:col-span-10 h-full overflow-y-scroll py-10 px-5 lg:px-10 bg-white">
        <div className="py-10">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
