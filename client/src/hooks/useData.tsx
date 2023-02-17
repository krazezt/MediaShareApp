import React, { useCallback, useContext, useEffect, useState } from 'react';
import Storage from '@react-native-async-storage/async-storage';

import {
  IArticle,
  ICategory,
  IProduct,
  IUser,
  IUseData,
  ITheme,
  IPost,
} from '../constants/types';

import {
  USERS,
  FOLLOWING,
  TRENDING,
  CATEGORIES,
  ARTICLES,
} from '../constants/mocks';
import { light } from '../constants';
import { useAccessToken } from './useAccessToken';
import { API, APIRoutes } from '../constants/APIs';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<ITheme>(light);
  const [user, setUser] = useState<IUser>(USERS[0]);
  const [users, setUsers] = useState<IUser[]>(USERS);
  const [explore, setExplore] = useState<IPost[]>([]);
  const [trending, setTrending] = useState<IProduct[]>(TRENDING);
  const [categories, setCategories] = useState<ICategory[]>(CATEGORIES);
  const [articles, setArticles] = useState<IArticle[]>(ARTICLES);
  const [article, setArticle] = useState<IArticle>({});
  const { accessToken, setAccessToken } = useAccessToken();
  const [sound, setSound] = useState<Sound>();
  const [playingMusicId, setPlayingMusicId] = useState<number>(-1);

  const callAPI = async (
    APIRoute: keyof APIRoutes,
    method: 'GET' | 'POST',
    data?: any,
    formData: boolean = false,
    alert: boolean = true,
  ): Promise<AxiosResponse | undefined> => {
    let result: AxiosResponse;
    const headers = {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
    };
    try {
      switch (method) {
        case 'GET':
          result = await axios.get(API[APIRoute], {
            headers,
          });
          return result;
        case 'POST':
          result = await axios.post(API[APIRoute], data, {
            headers,
          });
          return result;
        default:
          return undefined;
      }
    } catch (err: any) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          setAccessToken('');
          if (alert)
            Alert.alert(
              'Session Expired',
              'Your session is expired, please login again!',
              [{ text: 'OK', onPress: () => {} }],
            );
        } else {
          if (alert)
            Alert.alert('Something happened!', err.response.data.message, [
              { text: 'OK' },
            ]);
        }
      }
    }
  };

  // Sound hooks
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound(
    contentId: number,
    audioUri: string,
  ): Promise<boolean> {
    setPlayingMusicId(contentId);
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    setSound(sound);
    await sound.playAsync();
    return true;
  }

  async function stopSound(): Promise<boolean> {
    if (sound) {
      setPlayingMusicId(-1);
      sound.unloadAsync();
    }
    return true;
  }

  // get isDark mode from storage
  const getIsDark = useCallback(async () => {
    // get preferance gtom storage
    const isDarkJSON = await Storage.getItem('isDark');

    if (isDarkJSON !== null) {
      // set isDark / compare if has updated
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  // handle isDark mode
  const handleIsDark = useCallback(
    (payload: boolean) => {
      // set isDark / compare if has updated
      setIsDark(payload);
      // save preferance to storage
      Storage.setItem('isDark', JSON.stringify(payload));
    },
    [setIsDark],
  );

  // handle users / profiles
  const handleUsers = useCallback(
    (payload: IUser[]) => {
      // set users / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(users)) {
        setUsers({ ...users, ...payload });
      }
    },
    [users, setUsers],
  );

  // handle user
  const handleUser = useCallback(
    (payload: IUser) => {
      // set user / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(user)) {
        setUser(payload);
      }
    },
    [user, setUser],
  );

  // handle Article
  const handleArticle = useCallback(
    (payload: IArticle) => {
      // set article / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(article)) {
        setArticle(payload);
      }
    },
    [article, setArticle],
  );

  // get initial data for: isDark & language
  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  // change theme based on isDark updates
  useEffect(() => {
    setTheme(isDark ? light : light);
  }, [isDark]);

  const contextValue = {
    isDark,
    handleIsDark,
    theme,
    setTheme,
    user,
    users,
    handleUsers,
    handleUser,
    explore: explore,
    setExplore: setExplore,
    trending,
    setTrending,
    categories,
    setCategories,
    articles,
    setArticles,
    article,
    handleArticle,
    accessToken,
    setAccessToken,
    callAPI: callAPI,
    playSound,
    stopSound,
    playingMusicId,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
