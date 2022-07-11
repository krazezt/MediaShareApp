import { BackendConnectionConfig } from "./config"

export interface APIRoutes {
  SIGNUP        : string,
  LOGIN         : string,
  ME            : string,
  CHANGE_AVATAR : string,
  /*** API routes */
}

export const API: APIRoutes = {
  SIGNUP        : BackendConnectionConfig.baseURL + "/auth/signup",
  LOGIN         : BackendConnectionConfig.baseURL + "/auth/login",
  ME            : BackendConnectionConfig.baseURL + "/user/me",
  CHANGE_AVATAR : BackendConnectionConfig.baseURL + "/user/change-avatar",
  /*** API routes */
}