import Axios from "axios";
import { convertToFormData, capitalizeSentence } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";

export default (user) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { changeInfo: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/change-info",
      method: "PUT",
      data: convertToFormData(user),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_USER,
      value: { ...getState().userDetails, ...res.data },
    });
    toast.success("User information has been changed");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changeInfo: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changeInfo: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changeInfo: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changeInfo: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to change user info");
    }
  }
};
