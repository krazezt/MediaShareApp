import { BackendConnectionConfig } from '../constants/config';

const getVideoURI = (inDatabaseURL: string) => {
  return `${BackendConnectionConfig.baseURL}/assets/video/${inDatabaseURL}`;
};

export { getVideoURI };
