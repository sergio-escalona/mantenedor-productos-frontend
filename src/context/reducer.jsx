const token = window.localStorage.getItem('token') || null;

const sidebarCollapse = window.localStorage.getItem('sidebarCollapse') || false;

export const initialState = {
  isAuthenticated: !!token,
  // isAuthenticated: true,
  isValidUser: false,
  loading: false,
  user: undefined,
  errorMessage: undefined,
  sidebarCollapse: sidebarCollapse ? JSON.parse(sidebarCollapse) : false,
};

// eslint-disable-next-line
export const AuthReducer = (initialState, { type, payload }) => {
  switch (type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'VALIDATION_SUCCESS':
      return {
        ...initialState,
        isValidUser: true,
        user: payload,
        loading: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isAuthenticated: false,
        token: null,
      };

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: payload,
      };
    case 'GET_LOGGED_USER':
      return {
        ...initialState,
        user: payload,
      };
    case 'UPDATE_LOGGED_USER_PASSWORD':
      return {
        ...initialState,
        user: payload,
      };
    case 'REQUEST_LOADING':
      return {
        ...initialState,
        loading: true,
      };
    case 'END_LOADING':
      return {
        ...initialState,
        loading: false,
      };
    case 'CHANGE_NAVBAR_COLLAPSABLE':
      return {
        ...initialState,
        sidebarCollapse: payload,
      };

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
