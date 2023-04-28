interface List{
    label:string,
    name:string
    id:string,
}
const listFormMedicineUpdateOrDelete :List []=[
    {
    name:"name",
    id:"nameField",
    label:"nombre"
    },
    {
    name:"compound",
    id:"compundField",
    label:"compuesto"
    },
    {
    name:"price",
    id:"priceField",
    label:"precio"
    },
    {
    name:"type",
    id:"typeField",
    label:"tipo"
    },
    {
    name:"quantity",
    id:"quantityField",
    label:"camtidad"
    },
    {
    name:"function",
    id:"functionField",
    label:"function"
    },

]
export {listFormMedicineUpdateOrDelete}