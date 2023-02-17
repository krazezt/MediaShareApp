import { ShareState } from '../types';

interface ICreateContentImageRequest {
  caption: string;
  mediaURL: string;
  shareState: ShareState;
  categories: string[];
}

export { ICreateContentImageRequest };
