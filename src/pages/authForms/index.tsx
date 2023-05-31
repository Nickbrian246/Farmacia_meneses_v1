import {useState} from"react"
import { Alert, AlertTitle, Box } from "@mui/material";
import LogInForm from "./logInForm";
import RegisterForm from "./RegisterFrom";

interface Props{
  path:string
}
interface Error{
  isError: boolean,
  message:string
}

const AuthForms = (props:Props) => {
  const {path}= props
  const [ isError, setIsError]= useState<Error>({
    isError:false,
    message:""
  })
  if(isError.isError){
    setTimeout(()=>{
      setIsError({
        isError:false,
        message:""
      })
    },3000)
  }
  
  return ( 
    <>
    <Box 
    sx={{
      width:"100vw",
      height:"100vh",
      background:"#78DDFC",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
        {isError.isError && (
        <Alert style={{position:"fixed",top:"5%",right:"30%", left:"30%",zIndex:"10000000"}} severity="error">
        <AlertTitle>{isError.message}</AlertTitle>
        </Alert>
        )}
      {path==="/register" && (
        <RegisterForm setIsError={setIsError} isError={isError}/>
      )}
      {path==="/login" && (
        <LogInForm setIsError={setIsError} isError={isError}/>
      )}


    </Box>
    </>
  );
}
export default AuthForms;