import { BackendConnectionConfig } from './config'

export interface APIRoutes {
  SIGNUP                  : string,
  LOGIN                   : string,

  ME                      : string,
  CHANGE_AVATAR           : string,

  GET_PROFILE             : string,

  UPLOAD_FILE             : string,

  CREATE_CONTENT_IMAGE    : string,
  CREATE_CONTENT_VIDEO    : string,
  CREATE_CONTENT_MUSIC    : string,
  CREATE_COLLECTION       : string,

  GET_CONTENT_COMMENTS    : string,
  CREATE_COMMENT          : string,

  CREATE_REPORT           : string,

  VOTE_CONTENT            : string,
  UNVOTE_CONTENT          : string,
  GET_PRIVATE_KEY         : string,
  
  GET_COLLECTION_INFO     : string,
  GET_ROOT_COLLECTIONS    : string,
  ADD_POST_TO_COLLECTION  : string,
  JOIN_COLLECTION         : string,
  
  GET_DASHBOARD_CONTENT   : string,
  /*** API routes */
}

export const API: APIRoutes = {
  SIGNUP                  : BackendConnectionConfig.baseURL + '/auth/signup',
  LOGIN                   : BackendConnectionConfig.baseURL + '/auth/login',

  ME                      : BackendConnectionConfig.baseURL + '/user/me',
  CHANGE_AVATAR           : BackendConnectionConfig.baseURL + '/user/change-avatar',

  GET_PROFILE             : BackendConnectionConfig.baseURL + '/user/get-profile',

  UPLOAD_FILE             : BackendConnectionConfig.baseURL + '/assets/upload',

  CREATE_CONTENT_IMAGE    : BackendConnectionConfig.baseURL + '/content/upload-image',
  CREATE_CONTENT_VIDEO    : BackendConnectionConfig.baseURL + '/content/upload-video',
  CREATE_CONTENT_MUSIC    : BackendConnectionConfig.baseURL + '/content/upload-music',
  CREATE_COLLECTION       : BackendConnectionConfig.baseURL + '/content/create-collection',

  GET_CONTENT_COMMENTS    : BackendConnectionConfig.baseURL + '/content/get-content-comments',
  CREATE_COMMENT          : BackendConnectionConfig.baseURL + '/content/create-comment',

  CREATE_REPORT           : BackendConnectionConfig.baseURL + '/content/create-report',

  VOTE_CONTENT            : BackendConnectionConfig.baseURL + '/content/vote-content',
  UNVOTE_CONTENT          : BackendConnectionConfig.baseURL + '/content/unvote-content',
  GET_PRIVATE_KEY         : BackendConnectionConfig.baseURL + '/content/get-private-key',
  
  GET_COLLECTION_INFO     : BackendConnectionConfig.baseURL + '/content/get-collection-info',
  GET_ROOT_COLLECTIONS    : BackendConnectionConfig.baseURL + '/content/get-root-collections',
  ADD_POST_TO_COLLECTION  : BackendConnectionConfig.baseURL + '/content/add-post-to-collection',
  JOIN_COLLECTION         : BackendConnectionConfig.baseURL + '/content/join-collection',
  
  GET_DASHBOARD_CONTENT   : BackendConnectionConfig.baseURL + '/content/dashboard',
  /*** API routes */
}