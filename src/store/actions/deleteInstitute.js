import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
} from "../CONSTANTS";

export default (id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteInstitute: id } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/institute/remove",
      method: "DELETE",
      params: { id },
    });
    dispatch({
      type: REDUX_DEPARTMENT,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteInstitute: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteInstitute: null } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteInstitute: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteInstitute: null } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { deleteInstitute: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
