import { format, parseISO } from "date-fns";

const parse = (date) => {
  date = date instanceof Date ? date : parseISO(date);
  return date;
};

export const formatDate = (date, formatStr) => {
  return format(parse(date), formatStr || "yyyy-MM-dd");
};
