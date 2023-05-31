import { FormMedicine,PostMedicines } from "../interfaces"


const MedicDataForPost= (data: FormMedicine) :PostMedicines=> {
  const productsInStock: PostMedicines = {
    productsInStock: [
      {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        compound: data.compound,
        whatIsItFor: data.function,
        tag:data.type,
        size: data.size,
      }
    ]
  };
  console.log( data.name,)
  return productsInStock

}
export {MedicDataForPost}