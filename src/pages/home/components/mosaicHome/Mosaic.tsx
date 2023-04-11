import "./mosaic.css"
import {TbBottle} from "react-icons/tb";
import {BsThermometerSun} from "react-icons/bs"
const Mosaic = () => {
    return(
        <>
        <section className="mosaic-container">
            <div className="masaic-baseStyle mosaic-drinks">
                <TbBottle className="icon Bottle"/>
                <p>Bebidas</p>
            </div>
            <div className="masaic-baseStyle mosaic-pain">
                < BsThermometerSun className="icon drinks"/>
                <p>Bebidas</p>
            </div>
            <div className="masaic-baseStyle mosaic-vomit">
                < BsThermometerSun className="icon"/>
                <p>Bebidas</p>
            </div >
            <div className="masaic-baseStyle mosaic-diarrhea">
                < BsThermometerSun className="icon"/>
                <p>Bebidas</p>
            </div>
            <div className="masaic-baseStyle mosaic-whiteProdcs">
                < BsThermometerSun className="icon"/>
                <p>Bebidas</p>
            </div>
            <div className="masaic-baseStyle mosaic-fiber">
                < BsThermometerSun className="icon"/>
                <p>Bebidas</p> 
            </div>
        </section>
        </>
    )
}
export {Mosaic}