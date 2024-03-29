import i18n from 'i18n-js';
import { ImageSourcePropType } from 'react-native';
import { TCallAPIFunc } from '../../hooks/types';
import { EContentType } from './contentTypes';
import { ITheme } from './theme';

export * from './components';
export * from './theme';
export * from './contentTypes';
export * from './shareStates';
export * from './vote';
export * from './comment';
export * from './collection';

export interface IUser {
  id: number;
  name: string;
  email: string;
  avatarURL: string;
  about: string;
  social?: { twitter?: string; dribbble?: string };
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  accessibleTo: {
    content: {
      id: number;
      author: {
        id: number;
        avatarURL: string;
        name: string;
      };
      collection: {
        title: string;
      };
      votes: {
        userId: number;
        contentId: number;
        createdAt: string;
        type: string;
      }[];
      post: null;
      categories: [{ name: string }];
      type: 'COLLECTION' | 'POST';
    };
  }[];
}

export interface ICategory {
  id?: number;
  name?: string;
}
export interface IArticleOptions {
  id?: number;
  title?: string;
  description?: string;
  type?: 'room' | 'apartment' | 'house'; // private room | entire apartment | entire house
  sleeping?: { total?: number; type?: 'sofa' | 'bed' };
  guests?: number;
  price?: number;
  user?: IUser;
  image?: string;
}
export interface IArticle {
  id?: number;
  title?: string;
  description?: string;
  category?: ICategory;
  image?: string;
  location?: ILocation;
  rating?: number;
  user?: IUser;
  offers?: IProduct[];
  options?: IArticleOptions[];
  timestamp?: number;
  onPress?: (event?: any) => void;
}

export interface IProduct {
  id?: number;
  title?: string;
  description?: string;
  image?: string;
  timestamp?: number;
  linkLabel?: string;
  type: 'vertical' | 'horizontal';
}

export interface IPost {
  id: number;
  caption: string;
  type: EContentType;
  mediaURL: string;
  createdAt: string;
  content: {
    categories: { name: string }[];
    author: {
      id: number;
      avatarURL: string;
      name: string;
    };
    votes: {
      userId: number;
      contentId: number;
      createdAt: string;
      type: string;
    }[];
  };
}

export interface ILocation {
  id?: number;
  city?: string;
  country?: string;
}
export interface IUseData {
  isDark: boolean;
  handleIsDark: (isDark?: boolean) => void;
  theme: ITheme;
  setTheme: (theme?: ITheme) => void;
  user: IUser;
  users: IUser[];
  handleUser: (data?: IUser) => void;
  handleUsers: (data?: IUser[]) => void;
  basket: IBasket;
  handleBasket: (data?: IBasket) => void;
  explore: IPost[];
  setExplore: (data?: IPost[]) => void;
  trending: IProduct[];
  setTrending: (data?: IProduct[]) => void;
  categories: ICategory[];
  setCategories: (data?: ICategory[]) => void;
  recommendations: IArticle[];
  setRecommendations: (data?: IArticle[]) => void;
  articles: IArticle[];
  setArticles: (data?: IArticle[]) => void;
  article: IArticle;
  handleArticle: (data?: IArticle) => void;
  notifications: INotification[];
  handleNotifications: (data?: INotification[]) => void;
  accessToken: string;
  setAccessToken: (newAccessToken: string) => Promise<boolean>;
  callAPI: TCallAPIFunc;
  playSound: (contentId: number, audioUri: string) => Promise<boolean>;
  stopSound: () => Promise<boolean>;
  playingMusicId: number;
}

export interface ITranslate {
  locale: string;
  setLocale: (locale?: string) => void;
  t: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
  translate: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
}
export interface IExtra {
  id?: number;
  name?: string;
  time?: string;
  image: ImageSourcePropType;
  saved?: boolean;
  booked?: boolean;
  available?: boolean;
  onBook?: () => void;
  onSave?: () => void;
  onTimeSelect?: (id?: number) => void;
}

export interface IBasketItem {
  id?: number;
  image?: string;
  title?: string;
  description?: string;
  stock?: boolean;
  price?: number;
  qty?: number;
  qtys?: number[];
  size?: number | string;
  sizes?: number[] | string[];
}

export interface IBasket {
  subtotal?: number;
  items?: IBasketItem[];
  recommendations?: IBasketItem[];
}

export interface INotification {
  id?: number;
  subject?: string;
  message?: string;
  read?: boolean;
  business?: boolean;
  createdAt?: number | Date;
  type:
    | 'document'
    | 'documentation'
    | 'payment'
    | 'notification'
    | 'profile'
    | 'extras'
    | 'office';
}
