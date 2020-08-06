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
    toast.success("Anouncement added successfully");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addAnnouncement: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addAnnouncement: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addAnnouncement: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addAnnouncement: false } });
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
