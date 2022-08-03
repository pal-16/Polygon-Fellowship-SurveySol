import axios from "axios";
import { AUTH_SUCCESS, AUTH_ERROR } from "../reducers/types";

const BASE_URL = "http://localhost:8000/api";

export const getApplicationDetails = async ({ id, token }) => {
  try {
    const res = await axios.get(BASE_URL + `/applications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};

export const getSurveys = async ({ id, token, userType }) => {
  try {
    const res = await axios.get(BASE_URL + `/surveys`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};

// export const checkLogin = async ({ dispatch,id }) => {
//   try {
//     const res = await axios.post(BASE_URL + `/checklogin`, {
//       id
//     });
//     dispatch({
//       type: AUTH_SUCCESS,
//      //payload: { ...res.data, rememberme, userType }
//     });
//     return {
//       data: res.data,
//       status: res.status
//     };
//   } catch (err) {
//     dispatch({ type: AUTH_ERROR });
//     return {
//       error: err.response.data.error,
//       status: err.response.status
//     };
//   }
// };


export const login = async ({ dispatch, pubkey, rememberme, userType }) => {
  try {
    const res = await axios.post(BASE_URL + `/${userType}/login`, {
      pubkey
    });
    dispatch({
      type: AUTH_SUCCESS,
      payload: { ...res.data, rememberme, userType }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};

export const createSurvey = async ({ token, body }) => {
  try {
    console.log(body);
    const res = await axios.post(BASE_URL + "/survey/create", body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};



export const register = async ({ dispatch, body}) => {
  try {
    console.log("Palak")
    console.log(body);
    const res = await axios.post(`http://localhost:8000/api/user/register`, {
      ...body
    });
    dispatch({
      type: AUTH_SUCCESS,
      payload: { ...res.data, rememberme: true,  userType:"student" }
    });
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};

export const getUser = async ({ id, token, userType }) => {
  try {
    const res = await axios.get(`${BASE_URL}/${userType}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return {
      data: res.data,
      status: res.status
    };
  } catch (err) {
    return {
      error: err.response.data.error,
      status: err.response.status
    };
  }
};
