import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Header } from "../pages/home/components/header/Header"
import { NotFound } from "../pages/NotFound404"
import AuthGuard from "../guards/auth.guard"
import { Home } from "../pages/home"
import { Reports } from "../pages/reports"
import AuthForms from "../pages/authForms"


const RoutesApp= () => {


  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route element={<AuthForms path="/LogIn"/>}  path="/LogIn"/> 
      <Route element={<AuthForms path="/Register"/>}  path="/Register"/> 
      <Route path="/*" element= {<NotFound/>} />
        <Route element={<AuthGuard />}>
          <Route element={<Home path="/Home"/>}   path="/Home"/> 
          <Route element={<Reports path="/Reports"/>}   path="/Reports"/> 
          <Route path="/*" element= {<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  )
}
export {RoutesApp}

{/* <Stack>
<Header />
</Stack> */}