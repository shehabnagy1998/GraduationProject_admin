import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_USER,
  REDUX_IS_LOGED,
  REDUX_CLEAR,
} from "../CONSTANTS";

export default (_) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { checkToken: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/checkToken",
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_USER,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { checkToken: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { checkToken: false } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { checkToken: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { checkToken: true } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch({
        type: REDUX_CLEAR,
      });
      return;
    } else dispatch({ type: REDUX_PAGE_LOADERS, value: { checkToken: true } });
  }
};
