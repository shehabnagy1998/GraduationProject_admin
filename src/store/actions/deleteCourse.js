import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default (code) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteCourse: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/remove",
      method: "DELETE",
      params: { code },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_COURSE,
      value: res.data,
    });
    toast.success("Course has been deleted");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteCourse: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteCourse: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteCourse: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteCourse: false } });
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
