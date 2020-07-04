import Axios from "axios";
import { convertToFormData } from "../../utils/helper";
import {
  REDUX_USER,
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
} from "../CONSTANTS";

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
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changeInfo: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changeInfo: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { changeInfo: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { changeInfo: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { changeInfo: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
