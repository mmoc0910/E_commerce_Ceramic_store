import { FC, ReactNode } from "react";
import classNames from "../../utils/classNames";

type HeadingProps = { children?: ReactNode; className?: string };

const Heading: FC<HeadingProps> = ({ children, className = "" }) => {
  return <h3 className={classNames("text-center font-secondary font-semibold text-3xl uppercase", className)}>{children}</h3>;
};

export default Heading;
