import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
} from "../CONSTANTS";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { addDepartment: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/department/add",
      method: "POST",
      data: { ...obj },
    });
    dispatch({
      type: REDUX_DEPARTMENT,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addDepartment: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addDepartment: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addDepartment: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addDepartment: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { addDepartment: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
