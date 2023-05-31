import { FormMedicine,ModifyItemMedicine } from "../interfaces"



const adapterForMedicineUpdateItem= (data: FormMedicine,  id:string) :ModifyItemMedicine=> {
  const modifyItem: ModifyItemMedicine = {
    modifyItem:{
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      compound: data.compound,
      whatIsItFor: data.function,
      tag:data.type,
      size: data.size,
      id:id
      }
    }
      return modifyItem
  }




export {adapterForMedicineUpdateItem}