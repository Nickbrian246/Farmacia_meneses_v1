import "./saleModal.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { Alert, AlertTitle, Button } from "@mui/material";
import { postSales } from "./services";
import { salesAdapter } from "./adapters";
import { setClearState } from "../../../../store/slices/home/ProductCart";
import { useDispatch , useSelector} from "react-redux";

interface Item {
  name:string,
  price:number,
  quantity:number,
  total:number,
  id:string
}
interface Props {
  handleOpenSaleModal: () => void,
  total:number,
  data:Item[]
}
interface ErrorMessages{
  errorName:string,
  errorType: undefined |AlertColor,
  error:string,
  errorMessage:string
}
export type AlertColor = 'success' | 'info' | 'warning' | 'error';

const SaleModal=(props:Props) => {
  const token= useSelector((state:any)=> state.loggedUser.token)
  const [inputMoneyReceived, setInputMoneyReceived] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const[errorMessage, setErrorMessage] = useState<ErrorMessages>({
    errorName: '',
    errorType:"error",
    error: '',
    errorMessage: ''
  })

  const dispatch= useDispatch()
  const {
  handleOpenSaleModal,
  total,
  data,
} = props

  const handleInputChange= (event: ChangeEvent<HTMLInputElement>) => {
    setInputMoneyReceived(event.target.value)
  } 

  let cambio=0
  if(inputMoneyReceived) {
  cambio =  (inputMoneyReceived ? parseFloat(inputMoneyReceived) : 0) -total 
  }

  const handleCobrar= ( e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(cambio)
    if(cambio<= 0) {
      setErrorMessage({
        error:"quedo un adeudo",
        errorMessage:"favor de verificar el adeudo",
        errorName:"adeudo",
        errorType:"error"
      })
      setError((prevState) => !prevState)
    }else if(!inputMoneyReceived){
      setErrorMessage({
        error:"quedo un adeudo",
        errorMessage:"favor de verificar el adeudo",
        errorName:"adeudo",
        errorType:"error"
      })
      setError((prevState) => !prevState)
    }
    else {
      let cashReceived =(inputMoneyReceived ? parseFloat(inputMoneyReceived) : 0)
      const adapter= salesAdapter({data:data})
      // trabajar mensaje de error 
      postSales(adapter ,token)
      .then((response) => console.log(response))
      .catch(err => console.log(err))
      dispatch(setClearState([]))
      handleOpenSaleModal()
    }

    
}

if (error) {
  setTimeout(()=>{
    setError((prevState) => !prevState)
  },5000)
}

  return (
    <>
    <section className="backGroundContainer-SaleModal">
    {error && (
        <Alert style={{position:"fixed",top:"12%",right:"30%", left:"30%",zIndex:"10000000"}}
        severity={errorMessage.errorType}
        >
          <AlertTitle>{errorMessage.errorName}</AlertTitle>
          {errorMessage.error} — <strong>{errorMessage.errorMessage}</strong>
        </Alert>
        )}
      <div className="backGroundContainer-formContainer">
        <p>total: ${total}</p>
        
        <form onSubmit={handleCobrar}> 
          <label htmlFor="moneyReceived-input" className="formContainer-label">Efectivo recibido:</label>
            <input 
            id="moneyReceived-input"
            className="moneyReceivedInput"
            type="number"
            value={inputMoneyReceived}
            onChange={handleInputChange}/>
        <p>{cambio < 0 ? "faltan" : "cambio"}: $ { cambio}</p>
        
        <Button
        size="large"
        variant="contained"
        color="error"
        onClick={handleOpenSaleModal}
        >
        Cancelar
        </Button>
        <Button
        size="large"
        variant="contained"
        color="success"
        type="submit"
        >
          Cobrar
        </Button>
  
        </form>

      </div>

    </section>
    
    </>
  )
}

export {SaleModal}


