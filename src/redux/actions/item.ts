import axios, {AxiosRequestConfig} from 'axios';
import {Dispatch} from 'react';
import {GET_ROBOTS} from '../../constants/apiConst';

export interface RobotsGetAction {
  readonly type: 'GET_ROBOTS';
  payload: Robot[];
}

export interface Robot {
  name: any;
  image: any;
  price: any;
  stock: any;
  createdAt: any;
  material: any;
}

export function getRobotList() {
  return async (dispatch: Dispatch<any>) => {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.get(
        'http://10.0.2.2:8000/api/robots',
        config,
      );
      console.log(response.data);
      dispatch({
        type: GET_ROBOTS,
        payload: response.data,
      });
      return response || [];
    } catch (error) {
      console.error(error);
    }
  };
}
