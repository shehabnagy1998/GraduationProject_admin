import Axios from "axios";
import { convertToFormData } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
} from "../CONSTANTS";

export default (user) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { login: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/login",
      method: "PUT",
      data: convertToFormData(user),
    });
    dispatch({
      type: REDUX_USER,
      value: { ...res.data },
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { login: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { login: false } });
    getState().browseHistory.push("/dashboard");
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { login: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { login: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { login: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
