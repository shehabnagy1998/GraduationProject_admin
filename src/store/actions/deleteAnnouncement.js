import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_ANNOUNCEMENT,
} from "../CONSTANTS";
import { convertToFormData } from "../../utils/helper";

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
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { deleteAnnouncement: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
