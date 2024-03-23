import BannerHomePage from "../../components/banner/BannerHomePage";
import BeatSeller from "../../components/home/BeatSeller";
import NewProducts from "../../components/home/NewProducts";
import Recomendation from "../../components/home/Recomendation";

const HomePage = () => {
  return (
    <div>
      <BannerHomePage />
      <div className="container pb-20">
        <Recomendation />
        <BeatSeller />
        <NewProducts />
      </div>
    </div>
  );
};

export default HomePage;
