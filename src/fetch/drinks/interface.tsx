interface Drinks {
  name:string,
  price:number | string,
  brand:string,
  quantity:number | string,
  size:string | number,
  parts:string,
  type?:string 
}
export type {Drinks}