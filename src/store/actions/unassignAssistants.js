import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
  REDUX_ALL_COURSES_ASSISTANTS,
} from "../CONSTANTS";

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
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { unassignAssistants: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
