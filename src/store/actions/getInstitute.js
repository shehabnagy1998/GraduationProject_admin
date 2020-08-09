import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_INSTITUTE,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";

export default (_) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getInstitute: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/institute/getAll",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_INSTITUTE,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getInstitute: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getInstitute: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getInstitute: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getInstitute: true } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
  }
};
