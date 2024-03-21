import { FC, ReactNode, useEffect, useRef, useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import classNames from "../../utils/classNames";
import useOnClickOutside from "../../hooks/useOnClickOutside";

type CollapseProps = { children: ReactNode; title: string };

const Collapse: FC<CollapseProps> = ({ children, title }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [heightcontent, setHeightContent] = useState<number>(0);
  console.log("height content - ", heightcontent);
  const ref = useRef<HTMLDivElement>(null); // Ref now has a specific type of HTMLDivElement
  const [show, setShow] = useState<boolean>(false);
  useOnClickOutside(ref, () => {
    // setHeightContent(0)
    setShow(false);
  });
  const toggle = () => {
    setShow(!show);
  };
  useEffect(() => {
    if (contentRef.current) {
      console.log("content ref - ", contentRef.current.clientHeight);
      setHeightContent(contentRef.current.clientHeight);
    }
  }, [contentRef, show]);
  return (
    <div ref={ref}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => toggle()}
      >
        <span className="py-2 text-sm font-semibold uppercase">{title}</span>
        <span className="text-gray-500">
          <ChevronDown />
        </span>
      </div>
      <div
        ref={contentRef}
        className={classNames("transition-all duration-150 overflow-hidden px-2")}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapse;
