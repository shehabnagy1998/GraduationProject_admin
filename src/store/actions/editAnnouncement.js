import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_ANNOUNCEMENT,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { convertToFormData, capitalizeSentence } from "../../utils/helper";
import { toast } from "react-toastify";
import clearAll from "./clearAll";

export default (obj, setEditing) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { editAnnouncement: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/announcement/edit",
      method: "PUT",
      data: convertToFormData(obj),
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_ANNOUNCEMENT,
      value: res.data,
    });
    toast.success("Announcement has been edited");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editAnnouncement: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editAnnouncement: false } });
    setEditing({});
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editAnnouncement: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editAnnouncement: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to edit the announcement");
    }
  }
};
