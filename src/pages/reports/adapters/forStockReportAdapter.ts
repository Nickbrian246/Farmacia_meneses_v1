import { StockReport, StockWithColorNIsSelected } from "../interfaces";

export function stockAdapter(stock:StockWithColorNIsSelected[]):StockReport[]{
  const data:StockReport[] = stock.map((item)=> {
    let price = item.price.toLocaleString("en-US", { style: "currency", currency: "USD" });
    let brand = item.brand ? item.brand : "No definido";
    return {
        name:item.name,
        price:price,
        tag:item.tag,
        size:item.size,
        brand:brand,
        pieces:item.pieces,
        quantity:item.quantity,
      }
  })
  return data
}