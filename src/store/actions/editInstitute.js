import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_INSTITUTE,
} from "../CONSTANTS";

export default (obj, setEditing) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { editInstitute: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/institute/edit",
      method: "PUT",
      data: { ...obj },
    });
    dispatch({
      type: REDUX_INSTITUTE,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editInstitute: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editInstitute: false } });
    setEditing({});
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editInstitute: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editInstitute: false } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { editInstitute: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
