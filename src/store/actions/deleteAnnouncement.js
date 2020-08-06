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
  dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteAnnouncement: id } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/announcement/remove",
      method: "DELETE",
      params: { id },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_ANNOUNCEMENT,
      value: res.data,
    });
    toast.success("Announcement has been deleted");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteAnnouncement: null } });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { deleteAnnouncement: false },
    });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteAnnouncement: true } });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { deleteAnnouncement: null },
    });
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
