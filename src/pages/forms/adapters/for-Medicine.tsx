import { FormMedicine } from "../interfaces"
import { MedicineData } from "../../../services/dashboard-api/adapters/driver/medicine-api"

const MedicDataForPost= (data: FormMedicine) :MedicineData=> {
  const dataForPost= {
    name: data.name,
    price:data.price,
    quantity: data.quantity,
    compound:data.compound,
    tag: data.type ,
    whatIsItFor: data.function,
    size:data.size,
  }
  return dataForPost

}
export {MedicDataForPost}