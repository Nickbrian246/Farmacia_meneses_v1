   export interface Data {
        data(data: any): void | PromiseLike<void>
        name:string,
        compound:string,
        price:number,
        type:string,
        quantity:number,
        function:string,
        imgId?:string,
        id:string
    
    }
export interface PostMedicines{
    name:string,
    compound:string,
    price:number,
    type:string,
    quantity:number,
    function:string,
    imgId?:string,
    id:string

}
export interface MedicinesData  {
    name:string,
    compound:string,
    price:number,
    type:string,
    quantity:number,
    function:string,
    imgId?:string,
    id:string
}