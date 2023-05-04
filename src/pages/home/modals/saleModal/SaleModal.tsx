import "./saleModal.css";
import { ChangeEvent, useState } from "react";
import { Alert, AlertTitle, Button } from "@mui/material";
import {postSales} from "../../../../fetch/fetchMedicines/sales";
import { setClearState } from "../../../../store/slices/home/ProductCart";
import { useDispatch } from "react-redux";

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

  const handleCobrar= () => {
    if(cambio< 0) {
      setErrorMessage({
        error:"quedo un adeudo",
        errorMessage:"favor de verificar el adeudo",
        errorName:"adeudo",
        errorType:"error"
      })
      return setError((prevState) => !prevState)
    }
    let date= new Date()
    let dateString= date.toLocaleString()
    let cashReceived =(inputMoneyReceived ? parseFloat(inputMoneyReceived) : 0)
  const postSalesStructure= {
    products:[
      ...data,
    ],
    date: dateString,
    total:total,
    cashReceived:cashReceived,
    changeGiven:cambio
  }
  console.log(postSalesStructure);
  postSales(postSalesStructure)
  .then((response) => console.log(response))
  .catch(err => console.log(err))
  dispatch(setClearState([]))
  handleOpenSaleModal()
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
        <form>
          <label htmlFor="moneyReceived-input" className="formContainer-label">Efectivo recibido:</label>
            <input 
            id="moneyReceived-input"
            className="moneyReceivedInput"
            type="number"
            value={inputMoneyReceived}
            onChange={handleInputChange}/>
        </form>
        <p>{cambio < 0 ? "faltan" : "cambio"}: $ { cambio}</p>
        <div className="formContainer-BtnContainer">
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
        onClick={handleCobrar}
        >
          Cobrar
        </Button>
        </div>

      </div>

    </section>
    
    </>
  )
}

export {SaleModal}

