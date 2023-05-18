import  { ChangeEvent, useState } from "react";
import { Button, Stack, TextField, Typography, InputAdornment } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassWord(value);
    }
  };

  const handleTogglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

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
          <Button size="large" variant="contained" color="primary">
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
