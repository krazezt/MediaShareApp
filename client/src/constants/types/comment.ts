interface IComment {
  id: number;
  commentContent: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatarURL: string;
  };
}

export { IComment };
