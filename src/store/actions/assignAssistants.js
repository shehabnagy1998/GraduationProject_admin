import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_COURSE,
  REDUX_ALL_COURSES_ASSISTANTS,
} from "../CONSTANTS";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { assignAssistants: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/course/assignAssistant",
      method: "PUT",
      data: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({ type: REDUX_ALL_COURSES_ASSISTANTS, value: res.data });

    dispatch({ type: REDUX_PAGE_ERRORS, value: { assignAssistants: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { assignAssistants: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { assignAssistants: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { assignAssistants: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { assignAssistants: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
