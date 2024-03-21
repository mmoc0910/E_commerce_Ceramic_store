import React, { FC } from "react";
import { Control, useController } from "react-hook-form";
import classNames from "../../utils/classNames";

type InputProps = {
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  control: Control<any>;
  name: string;
  placeholder?: string;
  children?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const Input: FC<InputProps> = ({
  type = "text",
  className = "",
  control,
  name,
  placeholder = "",
  children,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, defaultValue: "" });
  return (
    <div className="relative">
      <input
        autoComplete="off"
        type={type}
        className={classNames(
          "text-base placeholder:text-text4 py-2 px-[25px] outline-none border border-solid w-full bg-inherit peer dark:placeholder:text-text2",
          error?.message
            ? "border-error text-error"
            : "border-black dark:border-dark-strock text-text1 dark:text-white",
          children ? "pr-16" : "",
          className
        )}
        placeholder={error?.message ? "" : placeholder}
        id={name}
        {...rest}
        {...field}
      />
      {error?.message && (
        <div className="peer-focus:hidden w-full font-medium text-error absolute pointer-events-none h-full flex items-center justify-start px-[25px] top-0 left-0">
          <p className="text-base bg-white dark:bg-dark-secondary leading-none translate-y-[2px] line-clamp-1 mr-5">
            {error.message}
          </p>
        </div>
      )}
      {children}
    </div>
  );
};

export default Input;
