export interface ListNetSalesDriven {
  name: string,
  price: number,
  quantity: number,
  total: string ,
  id: string,
}

export interface ListNetSalesOutPut{
  name: string,
  price: number,
  quantity: number,
  total: number,
  id: string,
}


export interface addedStockToListNetSales{
  name: string,
  price: number,
  quantity: number,
  total: number,
  id: string,
  stock:number
}

export interface SalesOfTheDay {
  createdAt:string,
  id:string,
  name:string,
  price:number,
  quantity:number,
  total:string,
  updatedAt:string,
  _id:string
}
export interface CleaningRepeatItems{
  createdAt:string,
  id:string,
  name:string,
  price:number,
  quantity:number,
  total:number,
  updatedAt:string,
  _id:string
}

export interface SaleModel {
  client: string,
  createdAt: string,
  date: string,
  salesOfTheDay: SalesOfTheDay[],
  updatedAt: string,
  _id: string
}
export interface ArraySaleTotalAndDay {
  total:number,
  date:string,
  day:string
}
export type TotalAndDatesArray = [number, string]
export type Array2levelS = Array<SaleModel>