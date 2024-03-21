import dayjs from "dayjs";

export const imgbbAPI = import.meta.env.VITE_IMGBBAPI;

export const DAY_FORMAT = (date: Date) =>
  dayjs(date).format("DD-MM-YYYY HH:mm");