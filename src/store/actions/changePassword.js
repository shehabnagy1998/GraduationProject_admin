import Axios from "axios";
import { convertToFormData } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
} from "../CONSTANTS";

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

    dispatch({ type: REDUX_PAGE_ERRORS, value: { changePassword: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changePassword: false } });
    setModal(false);
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changePassword: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changePassword: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { changePassword: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
