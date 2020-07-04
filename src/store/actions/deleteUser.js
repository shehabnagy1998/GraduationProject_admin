import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_USERS,
} from "../CONSTANTS";

export default (obj) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteUser: obj.code } });
  console.log(obj);
  try {
    const res = await Axios({
      baseURL: API,
      url: "/user/remove",
      method: "DELETE",
      params: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    console.log(res);
    dispatch({
      type: REDUX_USERS,
      value: res.data,
    });
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteUser: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteUser: null } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteUser: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteUser: null } });
    const errRes = error.response;
    console.log(errRes);
  }
};
