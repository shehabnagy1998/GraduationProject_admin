import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_INSTITUTE,
} from "../CONSTANTS";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { addInstitute: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/institute/add",
      method: "POST",
      data: { ...obj },
    });
    dispatch({
      type: REDUX_INSTITUTE,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addInstitute: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addInstitute: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addInstitute: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addInstitute: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { addInstitute: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
