
import { ResponseAuthFromBackEnd, UserLogged } from "../../../../interfaces/for-Auth"




const loggedAdapter= (userInfo:ResponseAuthFromBackEnd):UserLogged => {
    const adapter = {
      token:userInfo.data.token,
      name:userInfo.data.user.name,
    }
    return adapter

}

export {loggedAdapter}