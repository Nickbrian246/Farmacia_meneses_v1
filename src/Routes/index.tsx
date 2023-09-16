import { BrowserRouter,Routes,Route } from "react-router-dom"
import { NotFound } from "../pages/NotFound404"
import AuthGuard from "../guards/auth.guard"
import { Home } from "../pages/home"
import { Reports } from "../pages/reports"
import { Profile } from "../pages/profile/Profile"
import AuthForms from "../pages/authForms"



const RoutesApp= () => {


  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route element={<AuthForms path="/login"/>}  path="/logIn"/> 
      <Route element={<AuthForms path="/register"/>}  path="/register"/> 
      <Route path="/*" element= {<NotFound/>} />
        <Route element={<AuthGuard />}>
          <Route index element={<Home path="/home" />} />
          <Route element={<Reports path="/reportes/:option"/>}   path="/reportes/:option"/> 
          <Route element={<Profile path="/perfil"/>}   path="/perfil"/> 
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