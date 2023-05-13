import "./homeIndex.css"
import { Mosaic } from "./components/mosaicHome/Mosaic";
import {SelectedProductList} from "./components/selectedProducst/listProducts";
import {InputSearchByName} from "./components/inputSearchByName/InputSearchByName"

interface Props{
    path:string
}
const Home= (props:Props) =>{
    return (
        <>
        <section className="homeBodyContainer">
        <div className="masaicAndInputContainer">
            <InputSearchByName isforCartlist={true}/>
            <Mosaic/>
        </div>
        <SelectedProductList/>
        </section>
        </>
    )
}

export {Home}