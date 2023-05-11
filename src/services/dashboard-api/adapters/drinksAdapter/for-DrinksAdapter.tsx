import { Drinks } from "../interfaces/productInterface";
import { FormDrinks } from "../../../../pages/forms/interfaces";

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

const postDrinksAdapter= (data:FormDrinks):Drinks => {
  const adapter = {
    name:data.name,
    price:data.price,
    tag:data.type,
    quantity:data.quantity,
    brand:data.brand,
    size:data.size,
    pieces:data.parts
  }
  return adapter
}
export {getDrinksAdapter,postDrinksAdapter}