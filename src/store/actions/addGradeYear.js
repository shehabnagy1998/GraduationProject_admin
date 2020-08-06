import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_GRADE_YEAR,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { addGradeYear: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/gradeYear/add",
      method: "POST",
      data: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_GRADE_YEAR,
      value: res.data,
    });
    toast.success("Grade year added successfully");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addGradeYear: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addGradeYear: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addGradeYear: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addGradeYear: false } });
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
