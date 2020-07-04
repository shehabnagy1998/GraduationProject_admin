import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
} from "../CONSTANTS";

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
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteDepartment: null } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteDepartment: null } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteDepartment: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteDepartment: null } });
    const errRes = error.response;
    if (errRes && errRes.data) {
      dispatch({
        type: REDUX_PAGE_ERRORS,
        value: { deleteDepartment: { msg: errRes.data.message } },
      });
    }
    console.log(errRes);
  }
};
