import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_ANNOUNCEMENT,
} from "../CONSTANTS";
import { convertToFormData } from "../../utils/helper";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { addAnnouncement: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/announcement/add",
      method: "POST",
      data: convertToFormData(obj),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_ANNOUNCEMENT,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addAnnouncement: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addAnnouncement: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addAnnouncement: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addAnnouncement: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { addAnnouncement: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
