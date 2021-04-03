import * as actionTypes from "./actions";

const initialState = {
  isError: false,
  isDataLoaded: false,
  data: null,
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_DATA:
      return {
        ...state,
        data: action.payload,
        isDataLoaded: true,
      };
    case actionTypes.UPDATE_LOGIN_STATE:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
