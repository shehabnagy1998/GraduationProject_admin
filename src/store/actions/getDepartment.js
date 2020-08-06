import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default (institute_id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getDepartment: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/department/getAll",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    dispatch({
      type: REDUX_DEPARTMENT,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getDepartment: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getDepartment: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getDepartment: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getDepartment: true } });
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
