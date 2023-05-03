import "./card-selectedProduc.css"
import { FC } from "react"
import {useState} from "react"
import {BsFillTrashFill} from "react-icons/bs"
import { deleteItem } from "../../../../../../store/slices/home/ProductCart"
import {useDispatch} from "react-redux"
import {AiOutlineArrowRight,AiOutlineArrowLeft} from "react-icons/ai"
import { addIndividualProduct,decreaseIndividualProduct } from "../../../../../../store/slices/home/ProductCart"

interface Props{
    name:string,
    quantity:number,
    price:number,
    image?:string,
    id:string,
    total:number
}

const CardSelectedProduct:FC<Props> =(
    {name,
    price,
    image,
    id,
    quantity,
    total
}) =>{

const dispatch = useDispatch()

const handleDeleteItem=(id:string) => {
    dispatch(deleteItem(id))
}
const handleAddClick= (id:string) => {
    dispatch(addIndividualProduct(id))
}
const handleDecreaseClick=(id:string)=> {
    dispatch(decreaseIndividualProduct(id))
}
    return(
    <>
    <section className="cardSelectedProduct-container">
        <div className="cardSelectedProdudct-imgAndNameConainer">
        <picture >
        {image && (<img 
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
        <div style={{ display:"flex", gap:"13px"}}>
            <AiOutlineArrowLeft  onClick={() => {handleDecreaseClick(id)}}/>
            <p>{`${quantity}`}</p>
            <AiOutlineArrowRight  onClick={()=> {handleAddClick(id)}}/>
        </div>
        </div>
        <div 
        className="cardSelectedProduct-totalContainer"
        >
            <p>{`$${total}`}</p>
        </div>
        <aside 
        className="cardSelectedProduct-trashContainer"
        >
            <BsFillTrashFill onClick={() => {handleDeleteItem(id)}}/>
        </aside>
    </section>

    </>
    )
}

export {CardSelectedProduct}