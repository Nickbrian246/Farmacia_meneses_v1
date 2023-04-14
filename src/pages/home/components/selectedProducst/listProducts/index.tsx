import "./index-SelectedProduct.css"
import {CardSelectedProduct} from "./Card-selectedProduc";


const array = [
    {name:"genoprazal ", price:24512214,quantity:2, image:"https://www.publico.es/ahorro-consumo-responsable/wp-content/uploads/2023/02/medicamento-scaled.jpg"},
    {name:"hila mundo", price:24511214,quantity:2, image:"https://www.publico.es/ahorro-consumo-responsable/wp-content/uploads/2023/02/medicamento-scaled.jpg"},
    {name:"hila mundo", price:24521324,quantity:2, image:"https://www.publico.es/ahorro-consumo-responsable/wp-content/uploads/2023/02/medicamento-scaled.jpg"},
    {name:"hila mundo", price:2151214,quantity:2, image:"https://www.publico.es/ahorro-consumo-responsable/wp-content/uploads/2023/02/medicamento-scaled.jpg"},
    {name:"hila mundo", price:244224514,quantity:2, image:"https://www.publico.es/ahorro-consumo-responsable/wp-content/uploads/2023/02/medicamento-scaled.jpg"},
    {name:"hila mundo", price:21455614,quantity:2, image:"https://www.publico.es/ahorro-consumo-responsable/wp-content/uploads/2023/02/medicamento-scaled.jpg"},
    {name:"hila mundo", price:2,quantity:2, image:"https://www.publico.es/ahorro-consumo-responsable/wp-content/uploads/2023/02/medicamento-scaled.jpg"},

    ]
    
    
const SelectedProductList=()=>{ 
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
        {array.map(item => (
        <CardSelectedProduct
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        image={item.image}
        key={item.price}
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