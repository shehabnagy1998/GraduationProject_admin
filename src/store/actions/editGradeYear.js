import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_GRADE_YEAR,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

export default (obj, setEditing) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { editGradeYear: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/gradeYear/edit",
      method: "PUT",
      data: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_GRADE_YEAR,
      value: res.data,
    });
    toast.success("Grade year has been edited");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editGradeYear: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editGradeYear: false } });
    setEditing({});
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editGradeYear: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editGradeYear: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to edit the grade year");
    }
  }
};
