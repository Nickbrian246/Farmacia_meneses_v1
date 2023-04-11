import "./index-SelectedProduct.css"
import {CardSelectedProduct} from "./Card-selectedProduc";


const array = [
    {name:"hila mundo", price:24514,quantity:2},
    {name:"hila mundo", price:25124,quantity:2},
    {name:"hila mundo", price:25214,quantity:2},
    {name:"hila mundo", price:23514,quantity:2},
    {name:"hila mundo", price:23514,quantity:2},
    {name:"hila mundo", price:23514,quantity:2},
    {name:"hila mundo", price:23514,quantity:2},
    {name:"hila mundo", price:23514,quantity:2},
    {name:"hila mundo", price:23514,quantity:2},]
    
    
const SelectedProductList=()=>{ 
    return (
        <>
        <section className="ItemsContainer" >
        <div className="listConatiner">
        {array.map(item => (
        <CardSelectedProduct
        name={item.name}
        price={item.price}
        quantity={item.quantity}
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