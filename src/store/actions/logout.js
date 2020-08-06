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

export default () => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { logout: true } });
  console.log(getState().userDetails.token);
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/logout",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_USER,
      value: {},
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { logout: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { logout: false } });
    getState().browseHistory.push("/login");
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { logout: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { logout: false } });
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
