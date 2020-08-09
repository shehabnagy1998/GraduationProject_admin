import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_DEPARTMENT,
  REDUX_CLEAR,
} from "../CONSTANTS";
import { toast } from "react-toastify";
import clearAll from "./clearAll";
import { capitalizeSentence } from "../../utils/helper";

export default (obj, setEditing) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { editDepartment: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/department/edit",
      method: "PUT",
      data: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });
    dispatch({
      type: REDUX_DEPARTMENT,
      value: res.data,
    });
    toast.success("Department has been edited");
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editDepartment: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editDepartment: false } });
    setEditing({});
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { editDepartment: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editDepartment: false } });
    const errRes = error.response;
    console.log(errRes);
    if (errRes && errRes.status === 401) {
      dispatch(clearAll());
      return;
    }
    if (errRes && errRes.data) {
      toast.error(capitalizeSentence(errRes.data.message));
    } else {
      toast.error("Failed to edit the department");
    }
  }
};
