import Axios from "axios";
import { convertToFormData, capitalizeSentence } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_USERS,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";

export default (user) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { register: true } });
  try {
    const addRes = await Axios({
      baseURL: API,
      url: "/user/register",
      method: "POST",
      data: convertToFormData(user),
    });
    const res = await Axios({
      baseURL: API,
      url: "/user/getAll",
      method: "GET",
      params: { role_id: user.role_id },
    });
    dispatch({
      type: REDUX_USERS,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { register: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { register: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { register: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { register: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to register");
    }
  }
};
