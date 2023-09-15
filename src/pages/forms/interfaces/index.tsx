interface FormMedicine {
    name:string,
    compound:string,
    price:number,
    type:string,
    quantity:number,
    function:string,
    size:string
}
interface FormDrinks {
    name:string,
    price:number,
    brand:string,
    quantity:number,
    size:string,
    parts:number,
    type:string 
}
interface PostDrinksItem {
    name:string,
    price:number,
    brand:string,
    quantity:number,
    size:string,
    tag:string,
    pieces:number
}
interface PostFormMedicine {
    name:string,
    compound:string,
    price:number,
    tag:string,
    quantity:number,
    whatIsItFor:string,
    size:string
}
interface ModifyItemForMedicine {
    name:string,
    compound:string,
    price:number,
    tag:string,
    quantity:number,
    whatIsItFor:string,
    size:string,
    id:string
}
interface PostMedicines{
    productsInStock:[PostFormMedicine]
}
interface PostDrinks{
    productsInStock:[PostDrinksItem]
}

interface ModifyItemMedicine{
    modifyItem:ModifyItemForMedicine
}


    interface GeneralProducts {
    name:string,
    price:number,
    quantity:number,
    tag:string,
    size:string,
    brand:string,
    pieces:number,
    id:string
    } 
    interface ModifyItemForOtherProducts{
        modifyItem:GeneralProducts
    }

export type  {
    FormMedicine,
    FormDrinks,
    PostMedicines,
    PostDrinks,
    ModifyItemMedicine,
    ModifyItemForOtherProducts,
}
