    'use client'

import { createContext, useReducer, useContext, Dispatch, ReactNode, useEffect } from "react";


export interface CartItem {
    id: number,
    name: string,
    price: number,
    quantity: number
    thumbnail: string

}

export interface CartState {
    items: CartItem[]
}

type CartAction = {type: 'ADD_ITEM'; payload: CartItem} | {type: 'REMOVE_ITEM'; payload: number} | {type: 'UPDATE_QUANTITY'; payload: {id:number; quantity: number}}
                    | {type: 'CLEAR_CART'};

const initialState : CartState = {
    items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch(action.type) {
        case 'ADD_ITEM' : {
            const existingIndex = state.items.findIndex(item => item.id === action.payload.id)
            if(existingIndex >=0) {
                const updatedItems = [...state.items];
                updatedItems[existingIndex].quantity += action.payload.quantity
                return {...state, items: updatedItems}
            } else {
                return {...state, items: [...state.items, action.payload]}
            }
        }
        case 'REMOVE_ITEM' : {
            return {...state, items: state.items.filter(item => item.id !== action.payload)}
        }
        case 'UPDATE_QUANTITY': {
            const index = state.items.findIndex(item => item.id === action.payload.id)
            if(index >= 0){
                const updatedItems = [...state.items];
                updatedItems[index].quantity = action.payload.quantity;
                return { ...state, items: updatedItems };
            }
            return state;
        }
        case 'CLEAR_CART' : {
            return initialState;
        }
        default: 
        return state;
    }
}

interface CartContextProps {
  cart: CartState;
  dispatch: Dispatch<CartAction>;
}

function getInitialCartState() :CartState{
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        return JSON.parse(storedCart) as CartState;
      } catch {
        return { items: [] };
      }
    }
  }
  return { items: [] };
}


const CartContext = createContext<CartContextProps | undefined>(undefined);


export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, getInitialCartState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
}




export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}