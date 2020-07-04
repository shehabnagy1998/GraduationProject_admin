import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
  RE,
  REDUX_ALL_COURSES_ASSISTANTS,
} from "../CONSTANTS";

export default (course_code) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { listAll: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/listAll",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({ type: REDUX_ALL_COURSES_ASSISTANTS, value: res.data });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { listAll: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { listAll: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { listAll: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { listAll: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { listAll: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
