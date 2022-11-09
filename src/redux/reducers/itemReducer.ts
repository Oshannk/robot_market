import {GET_ROBOTS} from '../../constants/apiConst';
import {RobotsGetAction} from '../actions/item';

const initialState = {
  robotList: [],
};
const itemReducer = (state = initialState, action: RobotsGetAction) => {
  switch (action.type) {
    case GET_ROBOTS:
      return {
        ...state,
        robotList: [],
      };
    default:
      return state;
  }
};
export default itemReducer;
