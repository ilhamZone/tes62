import Axios from 'axios';
import * as types from '../types';

export const handleGetList = (params) => ({
  type: types.GET_LIST,
  payload: Axios({
    method: 'GET',
    url: `https://api.yelp.com/v3/businesses/search?location=new%york&limit=${params.limit}`,
    headers: {
      Authorization: params.token
    }
  })
});

export const handleGetDetail = (params) => ({
  type: types.GET_DETAIL,
  payload: Axios({
    method: 'GET',
    url: `https://api.yelp.com/v3/businesses/${params.id}`,
    headers: {
      Authorization: params.token
    }
  })
});

export const handleSearchList = (params) => ({
  type: types.SEARCH_LIST,
  payload: Axios({
    method: 'GET',
    url: `https://api.yelp.com/v3/businesses/search?location=new%york&limit=${params.limit}&term=${params.search}`,
    headers: {
      Authorization: params.token
    }
  })
});
