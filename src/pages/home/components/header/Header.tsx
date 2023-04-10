import './header.css';
import logoFarmaciaMeneses from "../../../../assets/Farmacias-meneses-logo.png"

const Header =() =>{

    return (
    <header className='header-container'>
        <picture className='logo-container'>
            <img className='logo-container-img' src={logoFarmaciaMeneses} alt='logo de empresa'/>
        </picture>
    </header>
    )
}
export {Header};