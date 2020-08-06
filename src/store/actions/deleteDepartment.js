import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";

export default (id) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteDepartment: id } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/department/remove",
      method: "DELETE",
      params: { id },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_DEPARTMENT,
      value: res.data,
    });
    toast.success("Department has been deleted");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteDepartment: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteDepartment: null } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteDepartment: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteDepartment: null } });
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
