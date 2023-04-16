import React,{ ReactNode} from "react"
import "./mosaicItem.css"

interface Props{
    children:ReactNode,
    name:string,

}
const MosaicItem=(props:Props) => {
    return (
        <>
        <section className="mosaic-container-item">
        <div className="mosaic-baseStyle">
                {props.children}
                <p>Bebidas</p>
            </div>

        </section>
        </>
    )
}
export {MosaicItem}