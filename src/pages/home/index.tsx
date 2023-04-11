import "./homeIndex.css"
import { Header } from "./components/header/Header";
import { Mosaic } from "./components/mosaicHome/Mosaic";
import {SelectedProductList} from "./components/selectedProducst/listProducts";
import {InputSearchByName} from "./components/inputSearchByName/InputSearchByName"
const Home= () =>{
    return (
        <>
        <header>
            <Header/>
        </header>
        <section className="homeBodyContainer">
        <div className="masaicAndInputContainer">
            <InputSearchByName/>
            <Mosaic/>
        </div>
        <SelectedProductList/>
        </section>
        </>
    )
}

export {Home}