import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_GRADE_YEAR,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default (id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteGradeYear: id } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/gradeYear/remove",
      method: "DELETE",
      params: { id },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_GRADE_YEAR,
      value: res.data,
    });
    toast.success("Grade year has been deleted");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteGradeYear: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteGradeYear: null } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteGradeYear: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteGradeYear: null } });
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
