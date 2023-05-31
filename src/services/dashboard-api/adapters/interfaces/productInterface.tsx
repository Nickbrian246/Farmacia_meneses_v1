export interface ModelData {
  name:string,
  price:number,
  quantity:number,
  compound:string,
  tag:string,
  whatIsItFor?:string,
  size:string,
  brand?:string,
  pieces?:string
  _id?:string
  }
  // esta es en general el de drinks
export interface Drinks {
  name:string,
  price:number,
  quantity:number,
  tag:string,
  size:string,
  brand:string,
  pieces:number
}
export interface GeneralProducts {
  name:string,
  price:number,
  quantity:number,
  tag:string,
  size:string,
  brand:string,
  pieces:number
}
export interface MedicineData {
  name:string,
  price:number,
  quantity:number,
  compound:string,
  tag:string,
  whatIsItFor:string,
  size:string,
  _id:string
}


export interface ModifyItemForOtherProducts{
    modifyItem:GeneralProducts
}
// export type MedicineData= Omit<ModelData, "brand"| "pieces" >
// export type PostDrinks= Omit<ModelData,"compound"|"whatIsFor">
// export type GetDrinks=Omit <ModelData,"compound"|"whatIsFor" >