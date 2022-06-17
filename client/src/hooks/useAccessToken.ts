import { useEffect, useState } from 'react';
import { StorageConfig } from '../constants/config';
import { useSecureStore } from './useSecureStore';

export function useAccessToken() {
  const [accessToken, setTmpAccessToken] = useState('');
  const { saveData, getData } = useSecureStore();

  useEffect(() => {
    getTmpAccessToken();
  }, []);

  const getTmpAccessToken = async () => {
    const token = await getData(StorageConfig.accessToken);
    setTmpAccessToken(token as string);
  };

  const setAccessToken = async (newAccessToken: string): Promise<boolean> => {
    await saveData(StorageConfig.accessToken, newAccessToken);
    setTmpAccessToken(newAccessToken);
    return true;
  };

  return { accessToken, setAccessToken };
}
