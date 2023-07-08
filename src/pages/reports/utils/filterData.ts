import { SetStateAction } from "react";
import { StockWithColorNIsSelected, addedStockToListNetSales } from "../interfaces";


type Data = addedStockToListNetSales[]| StockWithColorNIsSelected []
type Reference = string
type UpdateStateAction = React.Dispatch<SetStateAction<addedStockToListNetSales[]| StockWithColorNIsSelected >>
export function filterData(data:Data,reference:Reference,updateStateFunction:UpdateStateAction){
  if (reference.length === 0) {
    return updateStateFunction([])
  }
  const dataFiltered = data.filter((item) =>{
    return item.name.includes(reference)
  })
  updateStateFunction(dataFiltered)
}