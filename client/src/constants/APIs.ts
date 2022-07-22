import { BackendConnectionConfig } from "./config"

export interface APIRoutes {
  SIGNUP                : string,
  LOGIN                 : string,
  ME                    : string,
  CHANGE_AVATAR         : string,
  CREATE_CONTENT_IMAGE  : string,
  CREATE_CONTENT_VIDEO  : string,
  CREATE_CONTENT_MUSIC  : string,
  GET_DASHBOARD_CONTENT : string,
  /*** API routes */
}

export const API: APIRoutes = {
  SIGNUP                : BackendConnectionConfig.baseURL + "/auth/signup",
  LOGIN                 : BackendConnectionConfig.baseURL + "/auth/login",

  ME                    : BackendConnectionConfig.baseURL + "/user/me",
  CHANGE_AVATAR         : BackendConnectionConfig.baseURL + "/user/change-avatar",

  CREATE_CONTENT_IMAGE  : BackendConnectionConfig.baseURL + "/content/upload-image",
  CREATE_CONTENT_VIDEO  : BackendConnectionConfig.baseURL + "/content/upload-video",
  CREATE_CONTENT_MUSIC  : BackendConnectionConfig.baseURL + "/content/upload-music",
  GET_DASHBOARD_CONTENT : BackendConnectionConfig.baseURL + "/content/dashboard",
  /*** API routes */
}