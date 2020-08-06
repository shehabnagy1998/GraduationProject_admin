import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_HELP,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default () => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getHelps: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/help/getAllFor",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_HELP,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getHelps: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getHelps: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getHelps: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getHelps: true } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    }
    if (errRes && errRes.data) {
      toast.error(errRes.data.message);
    }
  }
};
