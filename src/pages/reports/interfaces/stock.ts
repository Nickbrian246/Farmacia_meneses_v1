export interface StockWithColorNIsSelected{
  name:string,
  price:number,
  quantity:number,
  compound?:string,
  tag:string,
  whatIsItFor:string,
  size:string,
  brand:string,
  pieces:number,
  color:string,
  isSelected:boolean
  _id:string
}

export interface StockReport{
  name:string,
  price:string,
  quantity:number,
  tag:string,
  size:string,
  brand:string,
  pieces:number,
}