import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
} from "../CONSTANTS";

export default (institute_id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getDepartment: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/department/getAll",
      method: "GET",
    });

    dispatch({
      type: REDUX_DEPARTMENT,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getDepartment: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getDepartment: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getDepartment: true } });
    // dispatch({ type: REDUX_PAGE_LOADERS, value: { getDepartment: false } });
    const errRes = error.response;
    console.log(errRes);
  }
};
