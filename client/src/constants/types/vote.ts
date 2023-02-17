enum EVoteState {
  NONE,
  LIKED,
  // DISLIKED,
}

enum EVoteType {
  UP = 'UP',
  DOWN = 'DOWN',
}

type VoteTypeValues<T extends keyof typeof EVoteType> = typeof EVoteType[T];

interface IVote {
  userId: number;
  contentId: number;
  createdAt: string;
  type: VoteTypeValues<keyof typeof EVoteType>;
}

export { EVoteState as VoteState, IVote };
