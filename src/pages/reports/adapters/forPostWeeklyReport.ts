import { ArrayOfDates, CleaningRepeatItems, FilterDataForReportWithNoDay, ListNetSalesDriven, ListNetSalesOutPut } from "../interfaces"
export function  postWeeklyReportsAdapter(date: string[]):ArrayOfDates{
    const dates:ArrayOfDates = {
      dates: date.map((item) => {
        return item
      })
    }
    return dates 
}
export function adapterForReport(data: ListNetSalesOutPut[]):FilterDataForReportWithNoDay[]{
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