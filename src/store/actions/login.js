import Axios from "axios";
import { convertToFormData } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

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
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    }
    if (errRes && errRes.data) {
      toast.error(errRes.data.message);
    }
  }
};
