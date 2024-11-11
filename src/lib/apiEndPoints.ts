// Import environment variables
import Env from "./env";

// Base API URL from environment variables
export const API_URL = Env.API_URL;

// Authentication-related endpoints
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const AUTH = "/auth";
export const VERIFICATION_CODE = "/verify-account";
export const CHECK_CODE = "/check-code";
export const SEND_CODE = "/send-code";
export const EDIT_PASSWORD = "/edit-password";
export const CHECK_CREDENTIALS = "/checkCredentials";
export const LOGOUT_URL = "/logout";

// Main-Entities-related endpoints
export const PODCAST = "/podcast";
export const PODCASTS = "/podcasts";
export const PODCASTER = `/podcaster`;
export const PODCASTERS = `/podcasters`;
export const COMPANY = `/company`;

// Favorites-related endpoints
export const TRENDING = `${PODCAST}/trending`;
export const FAVORITES_CATEGORIES = `/my-favorite-categories`;
export const FAVORITES_LIST = `/my-favorite-list`;
export const ADD_FAVORITES = `/add-to-favorite`;
export const REMOVE_FROM_FAVORITES = `/remove-from-favorite`;
export const PLAYLIST_DISTRIBUTION = `/playlist-links`;
export const CREATE_SHOW = `/create-show`;

// General actions endpoints
export const REQUEST = "/request";
export const INDEX = "/index";
export const SHOW = "/show";
export const CONVERSATIONS = "/conversations";
export const MESSAGE = "/message";
export const DETAILS = "/details";
export const CREATE = "/create";
export const UPDATE = "/update";
export const DELETE = "/delete";
export const CANCEL = "/cancel";
export const CHANGE_STATUS = "/change-status";
export const METADATA = "/metadata";
export const UPDATE_METADATA = "/update-metadata";
export const UPLOAD_MEDIA_FILE = "/upload-media-file";
export const PROFILE = "/profile";
export const PUBLISH = "/publish";
export const PLAY_LIST = "/play-list";
export const PLAYLIST = "/playlist";
export const PLAYLISTS = "/playlists";
export const PRICE = "/price";
export const PUBLISHED_PODCASTS = "/published-podcasts";
export const MY_PLAYBACK = "/my-playback";
export const SAVE_PLAYBACK = "/save-playback";
export const DEALT = "/dealed";
export const YOUTUBE = "/youtube";
export const SEARCH = "/search";
export const NOTIFICATION = "/notification";
export const STATISTICS = "/statistics";
export const TOGGLE = "/toggle";
export const ENABLE = "/enable";
export const VIEWS_OVER_TIME = "/views-over-time";
export const MOST_POPULAR = "/most-popular";
export const ENABLE_DISABLE = "/enable-disable";
export const WALLET = "/wallet";
export const CONTRACTS = "/contracts";
export const RSS = "/rss";
export const PAY = "/pay";
export const ASSIGN = "/assign";
export const STORIES = "/stories";
export const MARK_READ = "/mark-read";
export const TIME = "/time";
export const PLATFORM = "/platform";
export const COUNTRY = "/country";
export const PODCASTER_PLAYLIST = "/podcaster-playlist";
export const PLANS = "/plans";
export const BUY = "/buy";

// Social interaction endpoints
export const POST_URL = "/post";
export const COMMENT_URL = "/comment";

// Profile update endpoint
export const UPDATE_PROFILE = "/update/profile";
