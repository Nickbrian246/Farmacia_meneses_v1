import "./saleModal.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { Alert, AlertTitle, Button } from "@mui/material";
import { postSales } from "./services";
import { salesAdapter } from "./adapters";
import { setClearState } from "../../../../store/slices/home/ProductCart";
import { useDispatch , useSelector} from "react-redux";
import { setErrorMessage } from "../../../../store/slices/globalErrorMessage/globalErrorMessage";
import { blue } from "@mui/material/colors";

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
  const [inputMoneyReceived, setInputMoneyReceived] = useState<string>("");
  const [inputMoneyCurrencyFormat, setInputMoneyCurrencyFormat] = useState<string>("")
  const dispatch= useDispatch();
  
  const {
  handleOpenSaleModal,
  total,
  data,
} = props

  const handleInputChange= (event: ChangeEvent<HTMLInputElement>) => {
    let desformated = (event.target.value).replace(/[^0-9.]/g,"")
    setInputMoneyReceived(desformated)
    
    const rawNumber = parseFloat(desformated);
    const formattedValue = new Intl.NumberFormat("es-MX",{
      style:"currency",
      currency:"MXN"
    }).format(rawNumber)
    setInputMoneyCurrencyFormat(formattedValue)
    
  } 

  let cambio=0
  if(inputMoneyReceived) {
  cambio =  parseFloat(((inputMoneyReceived ? parseFloat(inputMoneyReceived) : 0) - total ).toFixed(2))
  }

  const handleCobrar= ( e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if( parseFloat(inputMoneyReceived) < total) {
      dispatch(setErrorMessage({
        isError:true,
        errorMessage:"favor de verificar el adeudo",
        title:"adeudo",
        severityType:"error",
        errorMessageBold:"",
      }))

    }else if(!inputMoneyReceived){
      dispatch(setErrorMessage({
        isError:true,
        errorMessage:"favor de verificar el adeudo",
        title:"adeudo",
        severityType:"error",
        errorMessageBold:"",
      }))

    }
    else {
      let cashReceived =(inputMoneyReceived ? parseFloat(inputMoneyReceived) : 0)
      const adapter= salesAdapter({data:data})

      postSales(adapter ,token)
      .then((response) => {
        if(response ==="OK"){
          dispatch(setErrorMessage({
            errorMessage:``,
            isError:true,
            errorMessageBold:"",
            severityType:"success",
            title:"Transaccion exitosa",
            duration:1500
            }))

          dispatch(setClearState([]))
          handleOpenSaleModal()
        };
      })
      .catch(err => {
        dispatch(setErrorMessage({
        errorMessage:`${err.response.data.errorMessage}`,
        isError:true,
        errorMessageBold:"pofavor revise la disponibilidad en stock",
        severityType:"error",
        title:"error al realizar la transaccion",
        duration:7000
        }))
      })
    
    } 
}

  return (
    <>
    <section className="backGroundContainer-SaleModal">
      <div className="backGroundContainer-formContainer">
        <p style={{
          alignSelf:"center",
          fontSize:"44px",
          fontWeight:"500",
          marginBottom:"0px", 
          }}>Total: {total.toLocaleString("es-MX",{style:"currency", currency:"MXN"})}</p>
        
        <form onSubmit={handleCobrar} className="form"> 
          <label htmlFor="moneyReceived-input" className="formContainer-label">Efectivo recibido:</label>
            <input 
            style={{outline:cambio<0? "3px solid red": "3px solid green"}}
            id="moneyReceived-input"
            className="moneyReceivedInput"
            type="text"
            value={inputMoneyCurrencyFormat}
            onChange={handleInputChange}
            />

        <p style={cambio<0 
        ? {
          fontSize:"24px",
          color:"red"}
        : {
          fontSize:"24px",
          color:"green",
          }}
          >
              {cambio < 0 
              ? "faltan" : "cambio"}
              : ${ cambio}
        </p>
        <Button
        disabled = {cambio<0}
        size="large"
        variant="contained"
        color="success"
        type="submit"
        >
          Cobrar
        </Button>
        </form>
        <Button
        size="large"
        variant="contained"
        color="error"
        onClick={handleOpenSaleModal}
        >
        Cancelar
        </Button>

      </div>

    </section>
    
    </>
  )
}

export {SaleModal}


