/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import classNames from "../../utils/classNames";

type QuantityType = {
  size?: "small" | "normal";
  amount?: number;
  onIncrease?: (value: number) => void;
  onReduce?: (value: number) => void;
};

const Quantity: FC<QuantityType> = ({
  size = "normal",
  amount = 1,
  onIncrease = (_value: number) => {},
  onReduce = (_value: number) => {},
}) => {
  return (
    <div
      className={classNames(
        "flex items-center border border-intuitive",
        size === "normal" ? "w-[90px] h-[40px]" : "w-[80px] h-[30px]"
      )}
    >
      <div
        className="flex items-center justify-center flex-1 cursor-pointer"
        onClick={() => amount > 1 && onReduce(amount - 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={classNames(size === "normal" ? "w-4 h-4" : "w-3 h-3")}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </div>
      <div
        className={classNames(
          "flex items-center justify-center flex-1 select-none",
          size === "normal" ? "text-base" : "text-sm"
        )}
      >
        {amount}
      </div>
      <div
        className="flex items-center justify-center flex-1 cursor-pointer"
        onClick={() => onIncrease(amount + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={classNames(size === "normal" ? "w-4 h-4" : "w-3 h-3")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>
  );
};

export default Quantity;
