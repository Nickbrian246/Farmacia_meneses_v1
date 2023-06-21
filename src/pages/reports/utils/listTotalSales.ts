import {
  Array2levelS,
  CleaningRepeatItems,
  ListNetSalesDriven,
  ListNetSalesOutPut,
  SaleModel,
  SalesOfTheDay,
  TotalAndDatesArray,
} from "../interfaces";
/**
 * este metodo quita y suma los repetidos
 * suma las propiedades de "total" y " quantity"
 * @param array pasa el array de ventas 
 * @returns 
 */
export function listNetSales (array:ListNetSalesDriven[]): ListNetSalesOutPut[]{
  let total: ListNetSalesOutPut[] = []
  
  const sales = array.map((item)=>{
    const found = total.find((totalItem)=> totalItem.name=== item.name);
  
      if(found){
        const index = total.findIndex((itemIndex)=> itemIndex.name=== found.name )
        let currentPosition =total[index]
        let oldQuantity = currentPosition.quantity
        let oldTotal = currentPosition.total
        const complement = {
          ...currentPosition,
          quantity:oldQuantity +  item.quantity,
          total: oldTotal + parseFloat(item.total)
        }
        const newTotal=[...total]
        newTotal.splice(index,1,complement)
        total= newTotal
    }else {
      const itemCleaned= {
        ...item,
        total: parseFloat(item.total)}

      total.push(itemCleaned)
    }

  })

return total

}
/**
 * este metodo retorna el total de las ventas $$
 * @param salesList pasa la lista de ventas limpia.
 * @returns 
 */
export function totalSales(salesList:ListNetSalesOutPut[]):number{
  const total = salesList.reduce((accumulator, currentValue)=>{
    return accumulator + currentValue.total
  },0)
  return total 
}

/**
 * el array dede contener un array anidado por cada dia de venta que contenga el objeto 
 * de "sales", dentro debe venir el array salesOfDay.
 * @param salesOfWeek recibe un arrays que debe contener otro array  donde cada array es un dia de ventas 
 * @returns retorna un array de 2 dimensinoes donde cada subArray tendra el total de venta y la fecha en formato AÑ0/MES/DIA
 */
export function reduceArraysOfSalesToTotalAndDate(salesOfWeek: []):TotalAndDatesArray[]{
  const arrayOfDatesAndTotal = salesOfWeek.map((mainArrayItem:Array2levelS)=>{
      const subArray = mainArrayItem.map((SubArrayItem:SaleModel)=>{
        let cleaningRepeatsItems:CleaningRepeatItems[] = []
        SubArrayItem.salesOfTheDay.forEach((salesItem:SalesOfTheDay)=>{
              const found = cleaningRepeatsItems.find((foundItem) => salesItem.name===foundItem.name )
              if(salesItem.name){
                if(found){
                    const index = cleaningRepeatsItems.findIndex((itemIndex)=> itemIndex.name=== found.name )
                    const currentPosition= cleaningRepeatsItems[index]
                    const oldTotal = currentPosition.total 
                    const complement = {...currentPosition, total: oldTotal + parseFloat(salesItem.total) }
            
                    const newItem = [...cleaningRepeatsItems]
                    newItem.splice(index, 1 , complement)
                cleaningRepeatsItems = newItem
                  }else {
                    const addToCleaningRepeatsItems = {
                      ...salesItem,
                      total: parseFloat(salesItem.total)
                    }
                    cleaningRepeatsItems.push(addToCleaningRepeatsItems)
                  }
                }
        })
        const total = cleaningRepeatsItems.reduce((accumulate, currentElement) => {
            return accumulate + currentElement.total
          },0)
        const result :TotalAndDatesArray = [total, SubArrayItem.date]
          return result
      })
  
    return subArray
  })
return arrayOfDatesAndTotal.flat()
}

