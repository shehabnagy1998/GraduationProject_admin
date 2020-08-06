import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_INSTITUTE,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { addInstitute: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/institute/add",
      method: "POST",
      data: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_INSTITUTE,
      value: res.data,
    });
    toast.success("Institute added successfully");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addInstitute: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addInstitute: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { addInstitute: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addInstitute: false } });
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
