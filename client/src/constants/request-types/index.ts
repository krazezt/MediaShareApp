import { ShareState } from '../types';

export interface ICreateContentImageRequest {
  caption: string;
  mediaURL: string;
  shareState: ShareState;
  categories: string[];
}
