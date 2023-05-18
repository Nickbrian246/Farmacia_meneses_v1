import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button, Stack, TextField, Typography, InputAdornment } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Autocomplete } from "@mui/material";
import { forAuth } from "../../../interfaces";

type Auth = Omit<forAuth, "state" | "role">;
type Role = Pick<forAuth, "role" >;
interface Props {
  path?:string,
}

const RegisterForm = (props:Props) => {
  const {path}= props
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [role, setRole]= useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser, setRegisterUser] = useState<Auth >({
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
    setSelectedState(value);
  };

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };
  const handleRole=(event: React.SyntheticEvent<Element, Event>, value: { label: string, value: string } | null) => {
    if (value) {
      setRole(value.value)
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const data= {...registerUser, selectedState,role}
    console.log(data);
    
  };

  return (
    <>
      <Stack
        sx={{
          borderRadius: "5px",
          width: "500px",
          height: "auto",
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
          onSubmit={handleSubmit}
        >
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
            onChange={handleEmailInput}
          />
          <TextField
            label="Ingrese una Contraseña"
            value={registerUser.password}
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
          <Button type="submit" size="large" variant="contained" color="primary">
            Iniciar Sesión
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
      </Stack>
    </>
  );
};

export default RegisterForm;

const estadosMexicanos = [
  { label: "Aguascalientes" },
  { label: "Baja California" },
  { label: "Baja California Sur" },
  { label: "Campeche" },
  { label: "Chiapas" },
  { label: "Chihuahua" },
  { label: "Coahuila" },
  { label: "Colima" },
  { label: "Durango" },
  { label: "Estado de México" },
  { label: "Guanajuato" },
  { label: "Guerrero" },
  { label: "Hidalgo" },
  { label: "Jalisco" },
  { label: "Michoacán" },
  { label: "Morelos" },
  { label: "Nayarit" },
  { label: "Nuevo León" },
  { label: "Oaxaca" },
  { label: "Puebla" },
  { label: "Querétaro" },
  { label: "Quintana Roo" },
  { label: "San Luis Potosí" },
  { label: "Sinaloa" },
  { label: "Sonora" },
  { label: "Tabasco" },
  { label: "Tamaulipas" },
  { label: "Tlaxcala" },
  { label: "Veracruz" },
  { label: "Yucatán" },
  { label: "Zacatecas" }
];
const roles = [
  { label: "empleado", value:"employee" },
  { label: "administrador", value:"admin" },
  { label: "maestro", value:"master" },

];
