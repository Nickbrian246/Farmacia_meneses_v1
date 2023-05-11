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

export type  {FormMedicine,FormDrinks}
// interface FormMedicineAdd {
//     name:string,
//     compound:string,
//     price:string,
//     type:string,
//     quantity:string,
//     function:string,
//     imgId?:string
// }
