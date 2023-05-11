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
    label:"compuesto:  clorfenimina| ...etc "
    },
    {
    name:"price",
    id:"priceField",
    label:"precio"
    },
    {
    name:"type",
    id:"typeField",
    label:"tipo: inyectado| tomado| supositorio... etc"
    },
    {
    name:"quantity",
    id:"quantityField",
    label:"cantidad en almacen"
    },
    {
    name:"function",
    id:"functionField",
    label:"para que sirve? dolor de cabeza| presion alta ...etc"
    },
    {   
    name:"size",
    id:"sizeField",
    label:"presentacion: 10mg | 20 tabletas | 90 Ml ...etc"
    },

]
const listFormForDrinks :List []=[
    {
    name:"name",
    id:"nameField",
    label:"Nombre"
    },
    {
    name:"price",
    id:"priceField",
    label:"Precio"
    },
    {
    name:"brand",
    id:"typeField",
    label:"Marca"
    },
    {
    name:"quantity",
    id:"quantityField",
    label:"Cantidad en stock"
    },
    {
    name:"size",
    id:"functionField",
    label:"Tamaño: 600ml | 200ml ...etc"
    },
    { 
    name:"parts",
    id:"functionField",
    label:"cuantos trae el paquete?"
    },

]
export {listFormForDrinks,listFormMedicineUpdateOrDelete}