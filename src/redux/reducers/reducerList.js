import * as types from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  list: [],
  detail: [],
  search: [],
};

export default function reducerCustomer(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_LIST}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${types.GET_LIST}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        list: action.payload.data,
      };
    case `${types.GET_LIST}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };

    case `${types.GET_DETAIL}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${types.GET_DETAIL}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        detail: action.payload.data,
      };
    case `${types.GET_DETAIL}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };

    case `${types.SEARCH_LIST}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${types.SEARCH_LIST}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        search: action.payload.data,
      };
    case `${types.SEARCH_LIST}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}
