import { ListNetSalesDriven,ListNetSalesOutPut } from "../interfaces";
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
