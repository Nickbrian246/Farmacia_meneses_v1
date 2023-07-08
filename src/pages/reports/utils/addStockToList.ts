import {ListNetSalesOutPut,GeneralProduct, addedStockToListNetSales, StockWithColorNIsSelected} from "../interfaces";

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
/**
 * quita los objetos que no tengan las propiedades como name etc y
 * agrega las propiedades de color y isSelected
 * @param stock array de stock 
 * @returns array con las ya existentes mas  propiedades de color y isSelected
 */
export function cleanStockNAddProperties(stock:GeneralProduct[]):StockWithColorNIsSelected[]{
  const dataCleaned:GeneralProduct[] = stock.filter((item)=>{
    if(item.name){ 
      return item
    }
  })
  const addProperties:StockWithColorNIsSelected[] = dataCleaned.map((item)=>{
    return{
      ...item,
      color:"",
      isSelected:false
    }
  })
  return addProperties
}