import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { addCourse: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/add",
      method: "POST",
      data: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_COURSE,
      value: res.data,
    });
    toast.success("Course Added successfully");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addCourse: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addCourse: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addCourse: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addCourse: false } });
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
