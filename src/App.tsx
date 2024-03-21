import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutUser from "./layout/LayoutUser";
import LayoutAdmin from "./layout/LayoutAdmin";
const HomePage = lazy(() => import("./page/user/HomePage"));
const CatalogPage = lazy(() => import("./page/user/CatalogPage"));
const CatalogDetailPage = lazy(() => import("./page/user/CatalogDetailPage"));
const OrderPage = lazy(() => import("./page/user/OrderPage"));
const FavoritePage = lazy(() => import("./page/user/FavoritePage"));
const ProductDetailPage = lazy(() => import("./page/user/ProductDetailPage"));
const Cartpage = lazy(() => import("./page/user/Cartpage"));
const CategoryPage = lazy(() => import("./page/admin/CategoryPage"));
const ActionCategoryPage = lazy(
  () => import("./page/admin/ActionCategoryPage")
);
const CategoryDetailPage = lazy(
  () => import("./page/admin/CategoryDetailPage")
);
const AddProductPage = lazy(() => import("./page/admin/AddProductPage"));
const EditProductPage = lazy(() => import("./page/admin/EditProductPage"));
const AdminOrderPage = lazy(() => import("./page/admin/AdminOrderPage"));
const AdminOrderDetail = lazy(() => import("./page/admin/AdminOrderDetail"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-screen h-screen">
            loading
          </div>
        }
      >
        <Routes>
          <Route element={<LayoutUser />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:catalogId" element={<CatalogDetailPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/order/:orderId" element={<OrderPage />} />
          </Route>
          <Route element={<LayoutAdmin />}>
            <Route path="/admin/category" element={<CategoryPage />} />
            <Route
              path="/admin/category/add"
              element={<ActionCategoryPage />}
            />
            <Route
              path="/admin/category/edit/:categoryId"
              element={<ActionCategoryPage />}
            />
            <Route
              path="/admin/category/:categoryId"
              element={<CategoryDetailPage />}
            />
            <Route
              path="/admin/category/product/add/:categoryId"
              element={<AddProductPage />}
            />
            <Route
              path="/admin/category/:categoryId/product/edit/:productId"
              element={<EditProductPage />}
            />
            <Route path="/admin/order" element={<AdminOrderPage />} />
            <Route path="/admin/order/:orderId" element={<AdminOrderDetail />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
