import { FC } from "react";
import { IconProps } from "../type";
import classNames from "../../utils/classNames";

const ArrowRightXML: FC<IconProps> = ({ className = "" }) => {
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
          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        />
      </svg>
    </span>
  );
};

export default ArrowRightXML;
