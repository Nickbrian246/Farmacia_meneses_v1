import  { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Stack, TextField, Typography, InputAdornment, Alert, AlertTitle } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AiOutlineConsoleSql, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LoggingRequest } from "../../../store/thunks/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkPassword } from "../../../utils";

interface Props {
  path?:string,
  setIsError:React.Dispatch<React.SetStateAction<Error>>,
  isError:Error
}
interface Error{
  isError:boolean,
  message:string
}


const LogInForm = (props:Props) => {
  const {setIsError,isError}= props
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const userState= useSelector((state:any) => state.loggedUser)  

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassWord(value);
    }
  };
  
    const handleSubmitForm =  (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const isError= checkPassword(password)
      if(isError){
        setIsError({
          isError:true,
          message:isError
        })
        return 
      }      
      const data= {
        email,
        password
      }
      dispatch(LoggingRequest(data) as any)
    };

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };
useEffect(()=>{
  if(userState.token){
    navigate("/home")
  }
},[userState.token])

  return (
    <>
      <Stack
        sx={{
          borderRadius: "5px",
          width: "500px",
          height: "500px",
          padding: "15px",
          boxShadow: "-4px -4px 16px 1px rgba(0,0,0,0.56)",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Typography sx={{ alignSelf: "center", fontSize: "2rem" }}>Bienvenido</Typography>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            gap: "30px"
          }}
          onSubmit={handleSubmitForm}
        >
          <TextField
            label="Ingrese su Correo"
            value={email}
            type="email"
            name="email"
            onChange={handleEmailInput}
          />
          <TextField
            label="Ingrese su Contraseña"
            value={password}
            error={isError.isError}
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleEmailInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <AiOutlineEyeInvisible onClick={handleTogglePasswordVisibility} />
                  ) : (
                    <AiOutlineEye onClick={handleTogglePasswordVisibility} />
                  )}
                </InputAdornment>
              )
            }}
          />
          <Button size="large" variant="contained" color="primary" type="submit">
            Iniciar Sesión
          </Button>
        </form>
        <Typography color={"red"} sx={{ mt: 3 }}>
          ¿No tiene una cuenta?
          <NavLink
            to="/Register"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              marginLeft: "4px"
            }}
          >
            Crear cuenta
          </NavLink>
        </Typography>
      </Stack>
    </>
  );
};

export default LogInForm;
