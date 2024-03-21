import React, { FC } from "react";
import classNames from "../../utils/classNames";
import CheckXML from "../icons/CheckXML";

type CheckboxType = {
  color: string;
  checked?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};
const CheckBoxColor: FC<CheckboxType> = ({
  color,
  checked = false,
  onClick = () => {},
  children,
}) => {
  return (
    <div className="flex items-start gap-2 max-sm:items-start max-md:items-center">
      <div
        style={{ backgroundColor: color }}
        className={classNames(
          "w-5 h-5 rounded-full flex items-center justify-center transition-all duration-75 cursor-pointer",

          checked ? "text-intuitive" : "text-transparent"
        )}
        onClick={onClick}
      >
        <input type="checkbox" className="hidden" />
        <span>
          <CheckXML />
        </span>
      </div>
      {children && (
        <div
          className="flex-1 text-sm font-medium cursor-pointer select-none"
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CheckBoxColor;
