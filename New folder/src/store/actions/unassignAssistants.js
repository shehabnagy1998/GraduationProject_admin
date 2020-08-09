import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
  REDUX_ALL_COURSES_ASSISTANTS,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

export default (course_code) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { unassignAssistants: course_code },
  });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/unassignAssistant",
      method: "DELETE",
      params: { course_code },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({ type: REDUX_ALL_COURSES_ASSISTANTS, value: res.data });
    toast.success("Assistant has been unassigned");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { unassignAssistants: null } });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { unassignAssistants: false },
    });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { unassignAssistants: true } });
    dispatch({
      type: REDUX_PAGE_LOADERS,
      value: { unassignAssistants: null },
    });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to unassign assistants from the course");
    }
  }
};
