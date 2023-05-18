import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Header } from "../pages/home/components/header/Header"
import { NotFound } from "../pages/NotFound404"
import { routerList } from "./RouterList"
import { Stack } from "@mui/material"


const RoutesApp= () => {


  return (
    <>
      <BrowserRouter>
      {/* <Stack>
        <Header/>
      </Stack> */}
    <Routes>
      {Object.values(routerList).map(({path, element , description,status}) => (
      <Route element= {element} path= {path} key={description}/>
      ))}
      <Route path='*' element= {<NotFound/>} />

    </Routes>
</BrowserRouter>
    </>
  )
}
export {RoutesApp}