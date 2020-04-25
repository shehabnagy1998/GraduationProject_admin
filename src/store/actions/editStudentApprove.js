import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_USERS,
} from "../CONSTANTS";

export default (code) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { editStudentApprove: code } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/toggleApprove",
      method: "PUT",
      data: { code },
    });
    dispatch({
      type: REDUX_USERS,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editStudentApprove: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editStudentApprove: null } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editStudentApprove: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editStudentApprove: null } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { editStudentApprove: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
