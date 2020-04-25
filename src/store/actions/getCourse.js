import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
} from "../CONSTANTS";

export default (_) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourse: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/getAll",
      method: "GET",
    });
    console.log(res);
    dispatch({
      type: REDUX_COURSE,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getCourse: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourse: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getCourse: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getCourse: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { getCourse: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
