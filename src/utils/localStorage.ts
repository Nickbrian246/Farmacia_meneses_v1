

export const persisLocalStorage= <T,>(key:string, values:T)=>{
  localStorage.setItem(key, JSON.stringify({...values}))
}
export const clearLocalStorage= <T,>(key:string)=>{
  localStorage.removeItem(key)
}

