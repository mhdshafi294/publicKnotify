import Env from "./env";

export const API_URL = Env.API_URL;
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const VERIFICATION_CODE = "/verify-account";
export const CHECK_CODE = "/check-code";
export const SEND_CODE = "/send-code";
export const EDIT_PASSWORD = "/edit-password";
export const CHECK_CREDENTIALS = "/checkCredentials";
export const LOGOUT_URL = "/logout";

export const PODCAST = "/podcast";
export const PODCASTER = `/podcaster`;

export const TRENDING = `${PODCAST}/trending`;
export const FAVORITES_CATEGORIES = `/my-favorite-categories`;
export const ADD_FAVORITES = `/add-to-favorite`;
export const REMOVE_FROM_FAVORITES = `/remove-from-favorite`;
export const REQUEST = "/request";
export const INDEX = "/index";
export const SHOW = "/show";
export const CREATE = "/create";
export const CANCEL = "/cancel";
export const CHANGE_STATUS = "/change-status";

export const POST_URL = "/post";
export const COMMENT_URL = "/comment";
export const UPDATE_PROFILE = "/update/profile";
