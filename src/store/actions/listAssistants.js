import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
  REDUX_COURSE_ASSISTANT,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default (course_code) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { listAssistants: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/listAssistants",
      method: "GET",
      params: { course_code },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({ type: REDUX_COURSE_ASSISTANT, value: res.data });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { listAssistants: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { listAssistants: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { listAssistants: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { listAssistants: true } });
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
