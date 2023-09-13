import { Alert, AlertTitle, Box } from "@mui/material";
import LogInForm from "./logInForm";
import RegisterForm from "./RegisterFrom";
import { useSelector, useDispatch} from "react-redux";
import { setAuthErrorMessage } from "../../store/slices/globalErrorMessage/forAuthErrorMessage";
import { setErrorMessage } from "../../store/slices/globalErrorMessage/globalErrorMessage";
interface Props{
  path:string
}
interface Error{
  isError: boolean,
  message:string
}

const AuthForms = (props:Props) => {
  const {path}= props;
  const {
    isError,
    severityType,
    title,
    errorMessage,
    errorMessageBold,
    duration,
  } = useSelector((state:any) => state.authErrorMessage)
  const dispatch = useDispatch()
 
  let durationMessage = duration ?? 3000;
  if(isError){
    setTimeout(()=>{
        dispatch(setAuthErrorMessage({
            isError:false,
            errorMessage:"",
            errorMessageBold:"",
            severityType:"error",
            title:""}))
    },durationMessage)
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
        {isError && (
        <Alert style={{
        position:"fixed",
        top:"5%",
        right:"30%",
        left:"30%",
        zIndex:"10000000"
        }}
        severity = {severityType}
        >
        <AlertTitle>{title}</AlertTitle>
        </Alert>
        )}
      {path==="/register" && (
        <RegisterForm />
      )}
      {path==="/login" && (
        <LogInForm />
      )}


    </Box>
    </>
  );
}
export default AuthForms;