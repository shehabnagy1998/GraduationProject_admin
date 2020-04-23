import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
} from "../CONSTANTS";

export default (obj, setEditing) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { editDepartment: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/department/edit",
      method: "PUT",
      data: { ...obj },
    });
    dispatch({
      type: REDUX_DEPARTMENT,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editDepartment: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editDepartment: false } });
    setEditing({});
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editDepartment: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editDepartment: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { editDepartment: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
