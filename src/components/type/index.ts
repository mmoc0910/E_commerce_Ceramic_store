export type IconProps = {
  className?: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  img: string;
  products: ProductType[];
  status: 1 | 0;
  __v: 0;
};

export type ProductType = {
  name: string;
  img: string;
  description: string;
  content: string;
  price: number;
  status: 1 | 0;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
};

export type OrderType = {
  _id: string;
  name: string;
  phone: string;
  address: string;
  note: string;
  cart: {
    product: ProductType;
    amount: number;
    _id: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
};
