import { IS_LOADING } from "../actions/types";

const intitalState = {
  isLoading: false
};

const LoaderReducer = (state = intitalState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};

export default LoaderReducer;
