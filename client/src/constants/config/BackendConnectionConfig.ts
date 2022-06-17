import Constants from 'expo-constants';
const { manifest } = Constants;

export const BackendConnectionConfig = {
  baseURL: `http://${(manifest as any).debuggerHost.split(':').shift()}:3000`,
};
