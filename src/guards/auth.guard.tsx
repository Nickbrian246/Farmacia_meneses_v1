import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export const AuthGuard = () => {
  const userState = useSelector((state: any) => state.loggedUser)
  console.log(userState);
  return userState.token ?   <Outlet/> : <Navigate to="login"/>
}
export default AuthGuard