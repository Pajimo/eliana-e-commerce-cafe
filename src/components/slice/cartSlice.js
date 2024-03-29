import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total_order: 0,
    total_price: 0,
    orders:[]
}

let eachOrderPrice = 0

const cartSlice = createSlice({
    name: 'Cart Slice',
    initialState,
    reducers:{
        ADD_TO_CART: (state, action) =>{
            const newOrder = action.payload
            const existingOrder = state.orders.find(order => order.id === newOrder.id)

            if(existingOrder){
                existingOrder.quantity = existingOrder.quantity + newOrder.quantity
                existingOrder.total_price+= newOrder.total_price
            }else{
                state.orders.push(newOrder)
                state.total_order = state.orders.length
            }

            for(var i = 0; i < state.orders.length; i++){
                //console.log(state.orders.length[i])
                eachOrderPrice = eachOrderPrice + state.orders[i].total_price
            }
            state.total_price = eachOrderPrice
            eachOrderPrice = 0
        },
        REMOVE_FROM_CART(state, action){
            const remainingOrder = state.orders.filter(order => order.id !== action.payload)
            console.log(remainingOrder)
            state.orders = remainingOrder
            state.total_order--
        },
        UPDATE_CART(state, action){
            for (var i = 0; i < action.payload.length; i++){
                state.orders.push(action.payload[i])
            }
            state.total_order = action.payload.length
            for(var i = 0; i < state.orders.length; i++){
                //console.log(state.orders.length[i])
                eachOrderPrice = eachOrderPrice + state.orders[i].total_price
            }
            state.total_price = eachOrderPrice
            eachOrderPrice = 0
        }
    }
})

export const {ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART} = cartSlice.actions

export default cartSlice