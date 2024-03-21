import React, { FC } from "react";
import classNames from "../../utils/classNames";
import CheckXML from "../icons/CheckXML";

type CheckboxType = {
  checked?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};
const Checkbox: FC<CheckboxType> = ({
  checked = false,
  onClick = () => {},
  children,
}) => {
  return (
    <div className="flex items-start gap-2 max-sm:items-start max-md:items-center">
      <div
        className={classNames(
          "w-[14px] h-[14px] border-2 flex items-center justify-center transition-all duration-75 cursor-pointer bg-transparent border-intuitive ",
          checked ? "text-intuitive" : "text-light"
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

export default Checkbox;
