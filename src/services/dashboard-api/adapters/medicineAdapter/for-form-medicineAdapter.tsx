import { MedicineData } from "../interfaces/productInterface"

const adapterForGetMedicine=(data:MedicineData) => {
    const adapter= {
      name:data.name,
      compound:data.compound,
      price:data.price,
      type:data.tag,
      function:data.whatIsItFor,
      size:data.size,
      quantity:data.quantity,
      id:data._id

    }
  return adapter
}


export {adapterForGetMedicine}