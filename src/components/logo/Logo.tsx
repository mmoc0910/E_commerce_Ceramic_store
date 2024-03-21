import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={""} className="w-fit bg-simple text-aesthetic font-medium flex flex-col items-center py-2 px-3 rounded-ss-3xl rounded-ee-3xl">
      <p className="leading-tight font-secondary">Cearmic</p>
      <p className="leading-tight font-secondary">store</p>
    </Link>
  );
};

export default Logo;
