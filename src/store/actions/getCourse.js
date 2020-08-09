import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";

export default (_) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourse: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/getAll",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_COURSE,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getCourse: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourse: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getCourse: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourse: true } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
  }
};
