import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
} from "../CONSTANTS";

export default (obj, setEditing) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { editCourse: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/edit",
      method: "PUT",
      data: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_COURSE,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editCourse: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editCourse: false } });
    setEditing({});
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editCourse: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editCourse: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { editCourse: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
