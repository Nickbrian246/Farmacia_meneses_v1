import React,{ useEffect} from "react"
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button, Box, TextField, Typography, InputAdornment, Alert, AlertTitle, CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RegisterRequest } from "../../../store/thunks/auth/authThunks";
import { checkPassword } from "../../../utils";
import RegisterUser from "../../../interfaces/for-Auth";
import { Role } from "../../../interfaces/for-Auth";
import { estadosMexicanos,roles } from "./utils";
import { useNavigate } from "react-router-dom";
import { setAuthErrorMessage } from "../../../store/slices/globalErrorMessage/forAuthErrorMessage";


type Register = Omit<RegisterUser, "state" | "role">;

interface Props {
  path?:string,

}
interface Error{
  isError:boolean,
  message:string
}

const RegisterForm = (props:Props) => {
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const userState= useSelector((State:any)=> State.loggedUser)
  const {isError} = useSelector((State:any)=> State.authErrorMessage)
  const [state, setSelectedState] = useState<string>("");
  const [role, setRole]= useState<Role>("admin");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [registerUser, setRegisterUser] = useState<Register >({
    age: 0,
    email: "",
    howManyBusinessHasWithUs: 1,
    name: "",
    password: "",
  });

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;

    setRegisterUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAutocompleteState = (event: ChangeEvent<{}>, value: string | null) => {
  if (value) {
    setSelectedState(value);
  }
  };

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };
  const handleRole=(event: React.SyntheticEvent<Element, Event>, value: { label: string, value: Role } | null) => {
    if (value) {
      setRole(value.value)
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const data= {...registerUser, state,role}
    const passwordDoesNotMeet= checkPassword(data.password)
    if (passwordDoesNotMeet) {
      console.log(`entrando`);
      
      dispatch(setAuthErrorMessage({
        errorMessage:"la contraseña no coincide",
        errorMessageBold:"favor de revisar la contraseña",
        isError:true,
        severityType:"error",
        title:`${passwordDoesNotMeet}`
      }))
      return 
    }
    setIsLoading(true)
    dispatch(RegisterRequest(data) as any)
  };
  useEffect(()=> {
    if(userState.token){
      navigate("/")
    }
  },[userState.token])
  if(isLoading){
    setTimeout(() => {
      setIsLoading(false)
      dispatch(setAuthErrorMessage({
        errorMessage:"",
        errorMessageBold:"",
        isError:true,
        severityType:"error",
        title:"Ha habido un error en el registro. Por favor, comuníquese con soporte técnico o inténtelo más tarde",
        duration:7_000
      }))
    }, 10_000);
  }

  return (
    <>
    {isLoading && (
        <Box sx={{
          display: 'flex',
          position:"absolute",
          zIndex:"100",
          left:"48%"
          }}>
          <CircularProgress  />
        </Box>
      )}
      <Box
        sx={{
          borderRadius: "5px",
          width: "600px",
          height: "500px",
          padding: "15px",
          boxShadow: "-4px -4px 16px 1px rgba(0,0,0,0.56)",
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          background:"#ffff"
        }}
      >
        <Typography sx={{ alignSelf: "center", fontSize: "2rem",}}>Bienvenido</Typography>
        <Typography sx={{ alignSelf: "center", fontSize: "1rem", mb:"20px"}}>Por favor, llene el registro.</Typography>
        
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "30px",
            flexWrap:"wrap"
          }}
          onSubmit={handleSubmit}
        >
        <div style={{display:"flex", gap:"10px"}}>
        <div style={{display:"flex", flexDirection:"column", gap:"15px"}}>
        <TextField
            label="Ingrese su Nombre"
            value={registerUser.name}
            type="text"
            name="name"
            onChange={handleEmailInput}
          />
          <TextField
            label="Ingrese su edad"
            value={registerUser.age}
            type="number"
            name="age"
            onChange={handleEmailInput}
          />
            <Autocomplete
            disablePortal
            onChange={handleRole}
            options={roles}
            id="combo-box-roles"
            getOptionLabel={(option) => option.label}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Cual es su role?" />}
          />
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:"15px"}}>
        <Autocomplete
            disablePortal
            onChange={handleAutocompleteState}
            id="combo-box-demo"
            options={estadosMexicanos.map((option) => option.label)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Seleccione su Estado" />}
          />

          <TextField
            label="Ingrese su Correo"
            value={registerUser.email}
            type="email"
            name="email"
            error={isError}
            onChange={handleEmailInput}
          />
          <TextField
            label="Ingrese una Contraseña"
            value={registerUser.password}
            error={isError}
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
        </div>
        </div>
          <Button type="submit" size="large" variant="contained" color="primary" >
            Crear cuenta
          </Button>
        </form>

        <Typography color={"red"} sx={{ mt: 3 }}>
          ¿Ya tiene una cuenta?
          <NavLink
            to="/LogIn"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              marginLeft: "4px"
            }}
          >
            Haga Click aqui para iniciar sesion
          </NavLink>
        </Typography>
      </Box>
    </>
  );
};

export default RegisterForm;
