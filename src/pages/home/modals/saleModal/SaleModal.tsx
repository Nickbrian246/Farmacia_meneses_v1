import "./saleModal.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { Alert, AlertTitle, Button } from "@mui/material";
import { postSales } from "./services";
import { salesAdapter } from "./adapters";
import { setClearState } from "../../../../store/slices/home/ProductCart";
import { useDispatch , useSelector} from "react-redux";
import { setErrorMessage } from "../../../../store/slices/globalErrorMessage/globalErrorMessage";

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
  const dispatch= useDispatch()
  // const[errorMessage, setErrorMessage] = useState<ErrorMessages>({
  //   errorName: '',
  //   errorType:"error",
  //   error: '',
  //   errorMessage: ''
  // })
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
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(setErrorMessage({
        errorMessage:`${err}`,
        isError:true,
        errorMessageBold:"",
        severityType:"error",
        title:"error al realizar la transaccion"
        }))
      })
    
    }

    
}

  return (
    <>
    <section className="backGroundContainer-SaleModal">
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


