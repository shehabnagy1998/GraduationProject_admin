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

export default (user, setModal) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { changePassword: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/change-password",
      method: "PUT",
      data: convertToFormData(user),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    toast.success("User password has been changed");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changePassword: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changePassword: false } });
    setModal(false);
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changePassword: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changePassword: false } });
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
