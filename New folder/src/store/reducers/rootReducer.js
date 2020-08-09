import {
  REDUX_USER,
  REDUX_DEPARTMENT,
  REDUX_INSTITUTE,
  REDUX_GRADE_YEAR,
  REDUX_PAGE_LOADERS,
  REDUX_PAGE_ERRORS,
  REDUX_PAGE_HELPERS,
  REDUX_BROWSE_HISTORY,
  REDUX_USERS,
  REDUX_COURSE,
  REDUX_COURSE_ASSISTANT,
  REDUX_ALL_COURSES_ASSISTANTS,
  REDUX_SOCKET,
  REDUX_ANNOUNCEMENT,
  REDUX_HELP,
  REDUX_CLEAR,
} from "../CONSTANTS";

const initState = {
  pageLoaders: {},
  pageHelpers: {},
  pageErrors: {},
  userDetails: {},
  instituteArr: [],
  departmentArr: [],
  gradeYearArr: [],
  userArr: [],
  courseArr: [],
  browseHistory: {},
  courseAssistants: [],
  allCoursesAssistants: [],
  socketObj: {},
  announcementArr: [],
  helpArr: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case REDUX_PAGE_LOADERS:
      return {
        ...state,
        pageLoaders: { ...state.pageLoaders, ...action.value },
      };

    case REDUX_PAGE_ERRORS:
      return {
        ...state,
        pageErrors: { ...state.pageErrors, ...action.value },
      };

    case REDUX_PAGE_HELPERS:
      return {
        ...state,
        pageHelpers: { ...state.pageHelpers, ...action.value },
      };

    case REDUX_USER:
      return {
        ...state,
        userDetails: action.value,
      };

    case REDUX_DEPARTMENT:
      return {
        ...state,
        departmentArr: action.value,
      };

    case REDUX_INSTITUTE:
      return {
        ...state,
        instituteArr: action.value,
      };

    case REDUX_GRADE_YEAR:
      return {
        ...state,
        gradeYearArr: action.value,
      };

    case REDUX_BROWSE_HISTORY:
      return {
        ...state,
        browseHistory: action.value,
      };

    case REDUX_USERS:
      return {
        ...state,
        userArr: action.value,
      };

    case REDUX_COURSE:
      return {
        ...state,
        courseArr: action.value,
      };

    case REDUX_COURSE_ASSISTANT:
      return {
        ...state,
        courseAssistants: action.value,
      };
    case REDUX_ALL_COURSES_ASSISTANTS:
      return {
        ...state,
        allCoursesAssistants: action.value,
      };
    case REDUX_SOCKET:
      return {
        ...state,
        socketObj: action.value,
      };
    case REDUX_ANNOUNCEMENT:
      return {
        ...state,
        announcementArr: action.value,
      };
    case REDUX_HELP:
      return {
        ...state,
        helpArr: action.value,
      };
    case REDUX_CLEAR:
      return {
        ...initState,
      };

    default:
      return { ...state };
  }
};
