import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

export default (obj, setEditing) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { editCourse: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/edit",
      method: "PUT",
      data: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_COURSE,
      value: res.data,
    });
    toast.success("Course has been edited");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editCourse: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editCourse: false } });
    setEditing({});
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editCourse: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editCourse: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to edit the course");
    }
  }
};
