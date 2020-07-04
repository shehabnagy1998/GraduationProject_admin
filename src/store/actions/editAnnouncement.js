import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_ANNOUNCEMENT,
} from "../CONSTANTS";
import { convertToFormData } from "../../utils/helper";

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
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editAnnouncement: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editAnnouncement: false } });
    setEditing({});
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editAnnouncement: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editAnnouncement: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { editAnnouncement: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
