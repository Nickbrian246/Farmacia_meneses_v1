import { Drinks } from "../interfaces/productInterface";
import { FormDrinks,PostDrinks ,ModifyItemForOtherProducts } from "../../../../pages/forms/interfaces";


const getDrinksAdapter= (data:Drinks):FormDrinks => {
  const adapter = {
    name:data.name,
    price:data.price,
    type:data.tag,
    quantity:data.quantity,
    brand:data.brand,
    parts:data.pieces,
    size:data.size
  }
  return adapter
}

const postDrinksAdapter= (data:FormDrinks):PostDrinks => {
  const productsInStock: PostDrinks = {
    productsInStock:[
      {
        name:data.name,
        price:data.price,
        tag:data.type,
        quantity:data.quantity,
        brand:data.brand,
        size:data.size,
        pieces:data.parts
      }
    ]

  }
  return productsInStock
}
const updateItem= (data:FormDrinks, id:string):ModifyItemForOtherProducts => {
  const productsInStock: ModifyItemForOtherProducts = {
    modifyItem:
      {
        name:data.name,
        price:data.price,
        tag:data.type,
        quantity:data.quantity,
        brand:data.brand,
        size:data.size,
        pieces:data.parts,
        id:id
      }
    

  }
  return productsInStock
}
export {getDrinksAdapter,postDrinksAdapter,updateItem}
