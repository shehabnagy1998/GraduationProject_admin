import Axios from "axios";
import {
  API,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_HELP,
} from "../CONSTANTS";
import getHelps from "./getHelps";

export default (obj, setEditing) => async (dispatch, getState) => {
  dispatch({ type: REDUX_PAGE_LOADERS, value: { solveHelp: true } });
  try {
    const res = await Axios({
      baseURL: API,
      url: "/help/solve",
      method: "PUT",
      data: { ...obj },
      headers: {
        Authorization: `Bearer ${getState().userDetails.token}`,
      },
    });

    setEditing({});
    dispatch({ type: REDUX_PAGE_ERRORS, value: { solveHelp: false } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { solveHelp: false } });
    await dispatch(getHelps());
  } catch (error) {
    dispatch({ type: REDUX_PAGE_ERRORS, value: { solveHelp: true } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { solveHelp: false } });
    const errRes = error.response;
    console.log(errRes);
  }
};
