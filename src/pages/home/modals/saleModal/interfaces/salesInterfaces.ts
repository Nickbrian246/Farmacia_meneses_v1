
export interface Item {
  name:string,
  price:number,
  quantity:number,
  total:number,
  id:string
}
export interface ListItems{
  data: Item[]
}
export interface PostNewSale {
  date: string;
  salesOfTheDay: Item[];
}

