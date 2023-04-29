import React,{ ReactNode} from "react"
import "./mosaicItem.css"


interface Props{
    children:ReactNode,
    name:string,
    width?:string,
    fontSize?:string,
    type:string,
    handleNextStep:(optionSelected:string) => string| void,

}
const MosaicItem=(props:Props) => {
    const { handleNextStep} = props;

    const handleClick = (optionSelected:string) =>{
        handleNextStep(optionSelected)
    }
    return (
        <>
        <section className="mosaic-container-item"  onClick={()=>handleClick(props.type)}>
        <div className="mosaic-baseStyle" style={{width:`${props.width}`}}>
                {props.children}
                <p style={{fontSize:`${props.fontSize}`}}>{props.name}</p>
            </div>

        </section>
        </>
    )
}
export {MosaicItem}