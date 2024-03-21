export const VND_FORMAT = (price: number) =>
  `${new Intl.NumberFormat("vi-VN", {
    // style: "currency",
    currency: "VND",
  }).format(price)}VND`;
