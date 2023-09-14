import react,{useEffect, useState} from "react"
import { Box, Stack, TextField, Typography } from "@mui/material";
import { Header } from "../home/components/header/Header";
import  styles from "./profile.module.css"
import { getUserDetails } from "./services";
import { useSelector } from "react-redux";
import { Role } from "../../interfaces/for-Auth";
import { setErrorMessage } from "../../store/slices/globalErrorMessage/globalErrorMessage";
import { useDispatch } from "react-redux";
interface Props {
    path:string
}
interface userProfileDetails {
    name:string,
    age:number,
    state:string,
    email:string,
    role:[Role]
}
const Profile = (props:Props) =>{
    const dispatch = useDispatch()
    const [userDetails, setUserDetails]= useState<userProfileDetails>({
        name:"",
        email:"",
        age:0,
        role:["employee"],
        state:""
    })
    const {token} = useSelector((state:any) => state.loggedUser);

    useEffect(()=>{
        getUserDetails(token)
        .then((res) => {
            setUserDetails(res.data)
        })
        .catch((err)=> {
            dispatch(setErrorMessage({
                errorMessage:"",
                errorMessageBold:"",
                isError:true,
                severityType:"error",
                title:"ha habido un error al traer la informacion de ususario",
                duration:5000
            }))
        }
        )
    },[])

    
    return(
        <>
        <Stack>
            <Header/>
        </Stack>

        <Box sx={{
            width:"100%",
            display:"flex",
            flexDirection:"column",
            padding:"80px",
            justifyContent:"center",
            alignItems:"center",
            }}>
                <Box 
                sx={{
                    background:"#2196f3",
                    padding:"20px", 
                    borderRadius:"10px"
                    }}
                >
                    <Typography 
                    align="center"
                    variant="h4" 
                    sx={{color:"#e0e0e0"}}
                    >
                        Informacion de Usuario
                    </Typography>
                    <Typography 
                    align="center"
                    variant="h6" 
                    sx={{color:"#e0e0e0"}}
                    >
                        La información presentada es solo de lectura 
                    </Typography>
                    <form className={styles.formRules}>
            <div className={styles.inputContainerBaseRules}>
                <TextField
                   InputProps={{
            readOnly: true,
          }}
                className={styles.inputBaseRules}
                id="outlined-basic"
                label="Nombre de Usuario"
                variant="outlined"
                value={userDetails.name}
                
                />
                <TextField
                className={styles.inputBaseRules}
                id="outlined-basic"
                label="Edad"
                variant="outlined"
                value={userDetails.age.toString()}
                    InputProps={{
            readOnly: true,
            }}
                
                />
                <TextField
                className={styles.inputBaseRules}
                id="outlined-basic"
                label="Estado"
                variant="outlined"
                value={userDetails.state}
                   InputProps={{
            readOnly: true,
          }}
                
                />
            </div>
            <div className={styles.inputContainerBaseRules}>
                <TextField
                className={styles.inputBaseRules}
                id="outlined-basic"
                label="Correo"
                variant="outlined"
                value={userDetails.email}
                    InputProps={{
                    readOnly: true,
                    }}
                
              />
              <TextField
                className={styles.inputBaseRules}
                id="outlined-basic"
                label="Role"
                variant="outlined"
                value={userDetails.role[0]}
                    InputProps={{
                    readOnly: true,
                    }}
                
                />
            </div>
            </form>
                </Box>
        </Box>
        </>
    )
};

export {Profile}