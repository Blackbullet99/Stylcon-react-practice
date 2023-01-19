import { AnyAction } from "redux";

import { CartItem } from "./cart.type";
import { setIsCartOpen, setCartItems } from "./cart.action";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    }; 
  }
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  return state;
};





// switch (action.type) {
//   case CART_ACTION_TYPES.SET_CART_ITEMS:
//     return {
//       ...state,
//       cartItems: action.payload,
//     };
//   case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//     return {
//       ...state,
//       isCartOpen: action.payload,
//     };
//   default:
//     return state;
// }
