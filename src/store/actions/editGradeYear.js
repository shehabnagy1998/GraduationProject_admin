import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_GRADE_YEAR,
} from "../CONSTANTS";

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
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editGradeYear: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editGradeYear: false } });
    setEditing({});
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editGradeYear: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editGradeYear: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { editGradeYear: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
