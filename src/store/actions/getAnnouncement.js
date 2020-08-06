import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_ANNOUNCEMENT,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { convertToFormData } from "../../utils/helper";
import { toast } from "react-toastify";

export default (id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { getAnnouncement: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/announcement/getAll",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_ANNOUNCEMENT,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getAnnouncement: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getAnnouncement: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { getAnnouncement: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { getAnnouncement: true } });
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
