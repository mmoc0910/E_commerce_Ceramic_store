import { FC } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import classNames from "../../utils/classNames";

type BreadcrumbProps = { items: { title: string; url?: string }[] };

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="flex items-center gap-2 py-5 text-base flex-wrap">
      {items.map(
        (item, index) => (
          <>
            {item.url !== undefined ? (
              <Link
                to={item.url}
                key={uuidv4()}
                className="block text-gray-400 hover:text-simple"
              >
                {item.title}
              </Link>
            ) : (
              <span
                key={uuidv4()}
                className={classNames(
                  index === items.length - 1 ? "text-intuitive" : ""
                )}
              >
                {item.title}
              </span>
            )}
            {index !== items.length - 1 ? <span key={uuidv4()}>/</span> : null}
          </>
        )
        // return ;
      )}
    </div>
  );
};

export default Breadcrumb;
