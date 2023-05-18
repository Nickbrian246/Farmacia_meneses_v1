
import { Box } from "@mui/material";
import LogInForm from "./logInForm";
import RegisterForm from "./RegisterFrom";

interface Props{
  path:string
}

const AuthForms = (props:Props) => {
  const {path}= props
  
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
      {path==="/Register" && (
        <RegisterForm/>
      )}
      {path==="/LogIn" && (
        <LogInForm/>
      )}


    </Box>
    </>
  );
}
export default AuthForms;