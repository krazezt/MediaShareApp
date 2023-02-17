import React from 'react';
import { EContentType, VoteState } from '../../constants/types';
import ImageViewerCard from './ImageViewerCard';
import MusicPlayerCard from './MusicPlayerCard';
import VideoPlayerCard from './VideoPlayerCard';

export default function PostCard(props: {
  type: EContentType;
  avatarUri: string;
  contentId: number;
  mediaURL: string;
  categories: { name: string }[];
  description: string;
  authorName: string;
  authorId: number;
  currentVoteState: VoteState;
}) {
  switch (props.type) {
    case EContentType.IMAGE:
      return (
        <ImageViewerCard
          avatarUri={props.avatarUri}
          contentId={props.contentId}
          imageUri={props.mediaURL}
          categories={props.categories}
          author={props.authorName}
          authorId={props.authorId}
          description={props.description}
          currentVoteState={props.currentVoteState}
        />
      );
    case EContentType.MUSIC:
      return (
        <MusicPlayerCard
          avatarUri={props.avatarUri}
          contentId={props.contentId}
          audioUri={props.mediaURL}
          categories={props.categories}
          author={props.authorName}
          authorId={props.authorId}
          description={props.description}
          currentVoteState={props.currentVoteState}
        />
      );
    case EContentType.VIDEO:
      return (
        <VideoPlayerCard
          avatarUri={props.avatarUri}
          contentId={props.contentId}
          videoUri={props.mediaURL}
          categories={props.categories}
          author={props.authorName}
          authorId={props.authorId}
          description={props.description}
          currentVoteState={props.currentVoteState}
        />
      );
  }
}
