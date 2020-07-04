import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
} from "../CONSTANTS";

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
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addCourse: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addCourse: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addCourse: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addCourse: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { addCourse: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
