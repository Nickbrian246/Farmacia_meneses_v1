interface List{
    label:string,
    name:string
    id:string,
}
const listFormMedicineUpdateOrDelete :List []=[
    {
    name:"name",
    id:"nameFieldMedicine",
    label:"nombre"
    },
    {
    name:"compound",
    id:"compundFieldMedicine",
    label:"compuesto:  clorfenimina| ...etc "
    },
    {
    name:"price",
    id:"priceFieldMedicine",
    label:"precio"
    },
    {
    name:"type",
    id:"typeFieldMedicine",
    label:"tipo: inyectado| tomado| supositorio... etc"
    },
    {
    name:"quantity",
    id:"quantityFieldMedicine",
    label:"cantidad en almacen"
    },
    {
    name:"function",
    id:"functionFieldMedicine",
    label:"para que sirve? dolor de cabeza| presion alta ...etc"
    },
    {   
    name:"size",
    id:"sizeFieldMedicine",
    label:"presentacion: 10mg | 20 tabletas | 90 Ml ...etc"
    },

]
const listFormForDrinks :List []=[
    {
    name:"name",
    id:"nameFieldDrinks",
    label:"Nombre"
    },
    {
    name:"price",
    id:"priceFieldDrinks",
    label:"Precio"
    },
    {
    name:"brand",
    id:"typeFieldDrinks",
    label:"Marca"
    },
    {
    name:"quantity",
    id:"quantityFieldDrinks",
    label:"Cantidad en stock"
    },
    {
    name:"size",
    id:"sizeFieldDrinks",
    label:"Tamaño: 600ml | 200ml ...etc"
    },
    { 
    name:"parts",
    id:"partsFieldDrinks",
    label:"cuantos trae el paquete?"
    },

]
const listFormForOtherProducts:List []=[
    {
    name:"name",
    id:"nameFieldOtherProductDrinks",
    label:"Nombre"
    },
    {
    name:"price",
    id:"priceFieldOtherProduct",
    label:"Precio"
    },
    {
    name:"brand",
    id:"brandFieldOtherProduct",
    label:"Marca"
    },
    {
    name:"quantity",
    id:"quantityFieldOtherProduct",
    label:"Cantidad que se agrega a inventario"
    },
    {
    name:"size",
    id:"sizeFieldOtherProduct",
    label:"Tamaño: 600ml | 200ml ...etc"
    },
    { 
    name:"parts",
    id:"partsFieldOtherProduct",
    label:"cuantos trae el paquete?"
    },
    { 
    name:"type",
    id:"typeFieldOtherProduct",
    label:"que tipo de productos es? sabritas | corta uñas ...etc"
    },

]
export {listFormForDrinks,listFormMedicineUpdateOrDelete,listFormForOtherProducts}