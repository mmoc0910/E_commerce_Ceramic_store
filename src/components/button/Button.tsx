import { Link } from "react-router-dom";
import classNames from "../../utils/classNames";
import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  href?: string;
  onClick?: () => void;
};
const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  className = "",
  href,
  onClick = () => {},
}) => {
  if (href)
    return (
      <Link
        to={href}
        className={classNames(
          "text-aesthetic text-lg uppercase bg-simple rounded-ss-3xl rounded-ee-3xl py-3 px-16 font-light flex items-center justify-center",
          className
        )}
      >
        {children}
      </Link>
    );
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        "text-aesthetic text-lg uppercase bg-simple rounded-ss-3xl rounded-ee-3xl py-3 px-16 font-light flex items-center justify-center",
        className
      )}
    >
      {children}
    </button>
  );
};
export default Button;
