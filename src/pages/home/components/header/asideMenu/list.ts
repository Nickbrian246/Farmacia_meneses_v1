interface ListItems{
    nombre:string
}
interface logOut{
    nombre:string,
    id:string
}

const listItems: ListItems[] = [
    {
    nombre:"Medicamentos"
    },
    {
    nombre:"Bebidas"
    },
    {
    nombre:"Otros productos"
    },
]
const secondList: ListItems[] = [
    {
    nombre:"Reportes",
    },
]
const logout: logOut[] = [
    {
    nombre:"Cerrar sesion",
    id:"logOut"
    },
]
export{listItems,logout, secondList}