import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
} from "../CONSTANTS";

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
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteCourse: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteCourse: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteCourse: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteCourse: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { deleteCourse: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
