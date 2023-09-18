import { 
  ArrayOfDates,
  CleaningRepeatItems,
  FilterDataForReportWithNoDay,
  ListNetSalesDriven,
  ListNetSalesOutPut,
  SaleModelForReport,
  SalesOfTheDay,
  modelForReport,
  modelForSalesOfTheDayReport,
  } from "../interfaces"
export function  postWeeklyReportsAdapter(date: string[]):ArrayOfDates{
    const dates:ArrayOfDates = {
      dates: date.map((item) => {
        return item
      })
    }
    return dates 
}
export function adapterForReport(data: ListNetSalesOutPut[] ):FilterDataForReportWithNoDay[]{
  const adapterForExcelReport = data.map((item) => {
    return {
      name:item.name,
      price:item.price,
      productSell:item.quantity,
      total: item.total
    }
  })
  return adapterForExcelReport
}
export function listOfSalesAdapterForReport(data:SalesOfTheDay[] ):modelForSalesOfTheDayReport[]{
  const adapterForExcelReport:modelForSalesOfTheDayReport []= data.map((item) => {
    return {
      name:item.name,
      price:item.price,
      productSell:item.quantity,
      total: item.total
    }
  })
  return adapterForExcelReport
}
/**
 * this function  is for twoDimensional list of sales 
 * it takes an array of two dimensioanal  then  search for the property salesOfTheDay 
 * and  filter their proporties 
 * @param listOfSales list of sales
 * @returns array of two dimensional with the data of salesOfTheDay filtered 
 */
export function adapterForReportTwoDimensionalArray(listOfSales:SaleModelForReport[][]) : modelForReport[][]{
  const listOfSalesAdapted: modelForReport[][] = listOfSales.map((saleList:SaleModelForReport[]) => { 
    //@ts-ignore
    const groupOfSalesAdepted:modelForReport[] = saleList.map((sale:SaleModelForReport): modelForReport[] => {
      const groupOfSales:SalesOfTheDay[] = sale.salesOfTheDay
      const adapter:modelForSalesOfTheDayReport[] = listOfSalesAdapterForReport(groupOfSales)
       //@ts-ignore
      return { ...sale,salesOfTheDay:adapter }
    })

    return groupOfSalesAdepted
  })

  return listOfSalesAdapted
}
