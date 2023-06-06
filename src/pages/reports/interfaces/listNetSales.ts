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
