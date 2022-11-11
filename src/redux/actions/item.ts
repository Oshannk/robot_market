import axios, {AxiosRequestConfig} from 'axios';
import moment from 'moment';
import {Dispatch} from 'react';
import { Platform } from 'react-native';
import {GET_ROBOTS} from '../../constants/apiConst';

export type Actions = RobotsGetAction | RobotAddCartAction | RobotGetCartAction;

export interface RobotsGetAction {
  readonly type: 'GET_ROBOTS';
  payload: Robot[];
}

export interface RobotAddCartAction {
  readonly type: 'ADD_TO_CART';
  payload: Cart;
}

export interface RobotGetCartAction {
  readonly type: 'GET_CART';
  payload: Cart[];
}

export interface Cart {
  id: any;
  name: any;
  image: any;
  price: any;
  stock: any;
  createdAt: any;
  material: any;
  qty: any;
  total: any;
}
export interface Robot {
  id: any;
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
      const baseUrl = Platform.OS === 'ios' ? 'http://localhost:8000/': 'http://10.0.2.2:8000/';
      const response = await axios.get(
        `${baseUrl}api/robots`,
        config,
      );
      let data: Robot[] = response.data.data;
      // data = data?.map((item: Robot, index: number) => ({
      //   id: index,
      //   ...item,
      // }));
      data = data?.map((item: Robot, index: number) => {
        let date = moment(item.createdAt).format('DD-MM-YYYY');
        return {...item, id: index, createdAt: date};
      });

      console.log('data', data);

      dispatch({
        type: GET_ROBOTS,
        payload: data,
      });
      return response || [];
    } catch (error) {
      console.error(error);
    }
  };
}
