import {ADD_TO_CART, GET_CART, GET_ROBOTS} from '../../constants/apiConst';
import {Actions, Cart, Robot} from '../actions/item';

const initialState = {
  robotList: [] as Robot[],
  cart: [] as Cart[],
};
const itemReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case GET_ROBOTS:
      return {
        ...state,
        robotList: action.payload,
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};
export default itemReducer;
