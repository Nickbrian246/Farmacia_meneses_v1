interface productData {
  name:string,
  price:number,
  quantity:number,
  compound?:string,
  tag?:string,
  whatIsFor?:string,
  size?:string,
  brand?:string,
  pieces?:string
  _id:string
  }

  interface adaptingDataForCarList{
    name:string,
    price:number,
    quantity:number,
    total:number,
    id:string
  }

const adaptingDataForCartList=(data:productData): adaptingDataForCarList=> {
  const adaptingForCart={
    name:data.name,
    price:data.price,
    quantity:1,
    total:data.price,
    id:data._id
  }
  return adaptingForCart
}
export {adaptingDataForCartList}