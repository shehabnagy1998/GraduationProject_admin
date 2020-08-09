import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_USERS,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

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
    dispatch({
      type: REDUX_USERS,
      value: res.data,
    });
    toast.success("User has been deleted");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteUser: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteUser: null } });
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { deleteUser: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { deleteUser: null } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to delete the user");
    }
  }
};
