import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_USERS,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import { capitalizeSentence } from "../../utils/helper";
import clearAll from "./clearAll";

export default (code, currentState) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { editStudentApprove: code } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/toggleApprove",
      method: "PUT",
      data: { code },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_USERS,
      value: res.data,
    });
    toast.success(
      currentState == "1"
        ? "User has been disapproved"
        : "User has been approved"
    );
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editStudentApprove: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editStudentApprove: null } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editStudentApprove: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editStudentApprove: null } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to do the operation, try again");
    }
  }
};
