import { EContentType } from './contentTypes';
import { IVote } from './vote';

type ContentTypeValues<T extends keyof typeof EContentType> =
  typeof EContentType[T];

interface ICollection {
  author: {
    id: number;
    avatarURL: string;
    name: string;
  };
  collection: {
    id: number;
    title: string;
    createdAt: string;
    childs: {
      id: number;
      title: string;
      createdAt: string;
      content: {
        categories: { name: string }[];
        votes: IVote[];
        author: {
          id: number;
          name: string;
          avatarURL: string;
        };
      };
    }[];
    posts: {
      post: {
        caption: string;
        id: number;
        type: ContentTypeValues<keyof typeof EContentType>;
        mediaURL: string;
        content: {
          categories: { name: string }[];
          votes: IVote[];
          author: {
            id: number;
            name: string;
            avatarURL: string;
          };
        };
      };
    }[];
  };
  votes: IVote[];
}

export { ICollection };
