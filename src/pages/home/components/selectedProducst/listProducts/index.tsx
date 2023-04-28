import {Key, useEffect, useState}from "react"
import "./index-SelectedProduct.css"
import {CardSelectedProduct} from "./card-SelectedProduct/Card-selectedProduc";
import { fetchMedicinesDatA } from "../../../../../fetch/fetchMedicines/fetchMedicines";



    interface List {
        _id: Key | null | undefined;
        name:string,
        compound:string,
        price:number,
        type:string,
        quantity:number,
        function:string,
        imgId?:string,
        image?:string
        id:string
    }
    
    
const SelectedProductList=()=>{ 
    const [productList, setProductList] = useState<List []>([])
    useEffect(()=>{
        fetchMedicinesDatA()
        .then((data) =>{ return setProductList(data.data);} )// revisar esto despues
    },[])
    return (
        <>
        <section className="ItemsContainer" >
        <div className="descriptons-topBar">
                <p>producto</p>
                <p>precio</p>
                <p>cantidad</p>
                <p>total</p>
                <p>eliminar</p>
        </div>
        <div className="listConatiner">
        {productList.map(item => (
        <CardSelectedProduct
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        image={item.image}
        key={item._id}
        />))}
        </div>
        <section className="total">
            TOTAL: 245
        </section>

        </section>
        </>
    )
}
export {SelectedProductList}