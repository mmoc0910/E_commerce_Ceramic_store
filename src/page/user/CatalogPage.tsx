import Breadcrumb from "../../components/common/Breadcrumb";
import CatalogProducts from "../../components/catalog/CatalogProducts";
import Recomendation from "../../components/home/Recomendation";

const CatalogPage = () => {
  return (
    <div className="container pb-20">
      <Breadcrumb items={[{ title: "Home", url: "/" }, { title: "Catalog" }]} />
      <CatalogProducts />
      <Recomendation />
    </div>
  );
};

export default CatalogPage;
