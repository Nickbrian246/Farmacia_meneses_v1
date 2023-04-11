import "./card-selectedProduc.css"
import { FC } from "react"

interface Props{
    name:string,
    quantity:Number,
    price:Number,
    image?:string,
}

const CardSelectedProduct:FC<Props> =(
    {name,
    quantity,
    price,
    image,
}) =>{
    return(
    <>
    <section className="cardSelectedPorudct-container">
        <picture className="cardSelectedProduct-ImgContainer">
            <img src="" alt="image from"/>
        </picture>
        <div className="cerdSelectedProduct-detailsContainer">
            <p>Nombre de medicamento</p>
            <p>precio$254 pejedolares</p>

        </div>
        <aside className="cardSelectedProduct-quanityContainer">
            <p>cantidad: 45</p>
        </aside>
    </section>

    </>
    )
}

export {CardSelectedProduct}