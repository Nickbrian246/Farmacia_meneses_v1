import {ListNetSalesOutPut,GeneralProduct, addedStockToListNetSales} from "../interfaces";

export function addStockToList(stock:GeneralProduct[], listCleared:ListNetSalesOutPut[]) :addedStockToListNetSales[] {
  const listData: addedStockToListNetSales[]=[]

  listCleared.forEach((listItem)=>{
      const found = stock.find((stockItem)=>(stockItem.name) &&  (stockItem.name ===listItem.name))
      if(found){
        const addedStock= {
          ...listItem,
          stock: found.quantity
        }
        listData.push(addedStock)
      }

    })
  return listData
}