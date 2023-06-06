import { PostNewSale, ListItems } from "../interfaces";
import { formatDate } from "../../../../reports/utils";

const today = new Date();
const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
const date= formatDate(formattedDate)
export const salesAdapter = (data: ListItems): PostNewSale => {
  const salesAdapter: PostNewSale = {
    date: date,
    salesOfTheDay: data.data.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      id: item.id,
      total: item.total
    }))
  };

  return salesAdapter;
};