import { createSlice, PayloadAction} from "@reduxjs/toolkit";
interface Item {
  name:string,
  price:number,
  quantity:number,
  total:number,
  id:string
}
interface State {
  shoppingCart: Item[]
}
const initialState:State= {
  shoppingCart: []
}


export const shoppingCartSlice = createSlice( {
  name:"shoppingCart",
  initialState,
  reducers: {
    setCartItems:(state,action:PayloadAction<Item>) => {
      const newItem= action.payload
      const checkIfExist= state.shoppingCart.some((item) => {return item.id=== newItem.id})
      if(checkIfExist){
        const updatedCart = state.shoppingCart.map((item) => {  
      if (item.id === newItem.id) {
        return { ...item, quantity: item.quantity + 1 }
        }
      return item
      })
    state.shoppingCart = updatedCart
  } else {
    state.shoppingCart.push(newItem)
  }
    },
    deleteItem:(state,action:PayloadAction<string>) =>{
      const id =action.payload;
      const index = state.shoppingCart.findIndex((item) => {
        return item.id === id
      })
      state.shoppingCart.splice(index,1)
      state.shoppingCart= state.shoppingCart
    },
    addIndividualProduct:(state,action)=> {
      const id = action.payload
      const index = state.shoppingCart.findIndex((item) => { return item.id ===id})
      state.shoppingCart[index].quantity+= +1
      state.shoppingCart[index].total= state.shoppingCart[index].price * state.shoppingCart[index].quantity 
    },
    decreaseIndividualProduct:(state,action:PayloadAction<string>) =>{
      const id = action.payload;
      const index = state.shoppingCart.findIndex((item) => { return item.id === id });
      
      state.shoppingCart[index].quantity -= 1;
      state.shoppingCart[index].total= state.shoppingCart[index].price * state.shoppingCart[index].quantity 
      
      if (state.shoppingCart[index].quantity <= 0) {
        state.shoppingCart.splice(index, 1);
      }
    }
  }
})

export default shoppingCartSlice.reducer;

export const { 
  setCartItems,
  deleteItem,
  addIndividualProduct,
  decreaseIndividualProduct,} = shoppingCartSlice.actions;