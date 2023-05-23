

export const checkPassword=(password:string):string=> {
  let size= password.length
  let error:string=""
  if(!size) return error="la contraseña no puede ser un campo vacio" 
  if(size< 3){
    return error=" la contraseña es muy corta"
  }
  if(!/[A-Z]/.test(password)){
    return error="la contraseña debe incluir al menos una letra mayuscula"
  }
  if(!/\d/.test(password)){
    return error=" la contraseña debe incluir al menos un numero"
  }
  if(/\s/.test(password)){
    return error=" no se pueden tener espacios en la contraseña"
  }  
  return error

}