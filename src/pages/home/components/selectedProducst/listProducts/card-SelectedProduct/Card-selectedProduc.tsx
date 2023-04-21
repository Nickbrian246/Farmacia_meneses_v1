import "./card-selectedProduc.css"
import { FC } from "react"
import {BsFillTrashFill} from "react-icons/bs"

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
    <section className="cardSelectedProduct-container">
        <div className="cardSelectedProdudct-imgAndNameConainer">
        <picture >
        {image && (            <img 
            className="cardSelectedProduct-imgContainer-img"
            src={image} 
            alt={`image medicine of ${name}`} 
            />)}
        </picture>
        <div className="cardSelectedProduct-nameContainer">
            <p>{name}</p>

        </div>
        </div>
        <div 
        className="cerdSelectedProduct-detailsContainerPrice"
        >
            <p>{`$${price}`}</p>

        </div>
        <div 
        className="cardSelectedProduct-quanityContainer"
        >
            <p>{`${quantity}`}</p>
        </div>
        <div 
        className="cardSelectedProduct-totalContainer"
        >
            <p>{`$${quantity}`}</p>
        </div>
        <aside 
        className="cardSelectedProduct-trashContainer"
        >
            <BsFillTrashFill/>
        </aside>
    </section>

    </>
    )
}

export {CardSelectedProduct}