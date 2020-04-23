import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_GRADE_YEAR,
} from "../CONSTANTS";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { addGradeYear: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/gradeYear/add",
      method: "POST",
      data: { ...obj },
    });
    dispatch({
      type: REDUX_GRADE_YEAR,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addGradeYear: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addGradeYear: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addGradeYear: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addGradeYear: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { addGradeYear: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
