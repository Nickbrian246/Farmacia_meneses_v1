export interface ReportTodayItem{
    name:string,
    price:string,
    sells:string,
    productsInStock:string
}


export interface ReportsList{
  data: ReportTodayItem[]
}

export interface GeneralProduct{
  name:string,
  price:number,
  quantity:number,
  compound?:string,
  tag:string,
  whatIsItFor:string,
  size:string,
  brand:string,
  pieces:number
}
export interface ResponseGeneralProduct{
  productsInStock:GeneralProduct[]
}