import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_USERS,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getAllUsers: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/getAll",
      method: "GET",
      params: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_USERS,
      value: res.data,
    });

    dispatch({ type: REDUX_PAGE_ERRORS, value: { getAllUsers: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getAllUsers: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getAllUsers: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getAllUsers: true } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
  }
};
