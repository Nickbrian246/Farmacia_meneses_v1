import "./index-SelectedProduct.css"
import {CardSelectedProduct} from "./card-SelectedProduct/Card-selectedProduc";
import {useSelector} from"react-redux"
import { Button } from "@mui/material";
import { SaleModal } from "../../../modals/saleModal/SaleModal";
import { useState } from "react";
    interface Item {
        name:string,
        price:number,
        quantity:number,
        total:number,
        id:string
    }
    interface State {
        shoppingCartReducer:shoppingCartReducer
    }
    interface shoppingCartReducer {
        shoppingCart: Item[]
    }
const SelectedProductList=()=>{ 
    const[ isOpenSaleModal, setIsOpenSaleModal] = useState<boolean>(false)
    const data = useSelector((state:State)=> state.shoppingCartReducer.shoppingCart)
    const total= data.map((item:Item) => {
        let money = 0
        return money+= item.total
    });
    let sum= total.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    },0);

    const handleOpenSaleModal=()=> {
        setIsOpenSaleModal((prevState) => !prevState)
    }
    
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
        {data.map((item:Item) => (
        <CardSelectedProduct
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        key={item.id}
        id={item.id}
        total={item.total}
        />
        ))}
        </div>
        <section className="total">
            <div className="total-sumTotal">
            TOTAL: ${sum}
            </div>
            <Button
            variant="contained"
            size="large"
            onClick={handleOpenSaleModal}
            >
                Pagar
            </Button>
        </section>
        
        </section>
        {isOpenSaleModal && (
            <SaleModal
            handleOpenSaleModal={handleOpenSaleModal}
            total={sum}
            data={data}
            />
        )}
        </>
    )
}
export {SelectedProductList}