import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_MESSAGE":
      return {
        ...state,
        message: action.payload
      };
    case "CHANGE_AUTH":
      return {
        ...state,
        authenticated: action.payload
      };
    case "CHANGE_ARTICLE":
      return {
        ...state,
        currentArticle: action.payload
      };
    case "CHANGE_ARTICLE_ID":
      return {
        ...state,
        currentArticleId: action.payload
      };
    case "CHANGE_USER_ATTRIBUTES":
      return {
        ...state,
        userAttrs: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
