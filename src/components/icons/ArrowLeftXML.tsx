import { FC } from "react";
import { IconProps } from "../type";
import classNames from "../../utils/classNames";

const ArrowLeftXML: FC<IconProps> = ({ className = "" }) => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={classNames("w-10 h-auto", className)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
        />
      </svg>
    </span>
  );
};

export default ArrowLeftXML;
