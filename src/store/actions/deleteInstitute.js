import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

export default (id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteInstitute: id } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/institute/remove",
      method: "DELETE",
      params: { id },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_DEPARTMENT,
      value: res.data,
    });
    toast.success("Institute has been deleted");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteInstitute: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteInstitute: null } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteInstitute: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteInstitute: null } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to delete the intitute");
    }
  }
};
