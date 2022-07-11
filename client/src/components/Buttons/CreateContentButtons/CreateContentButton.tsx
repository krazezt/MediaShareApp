import React from 'react';
import CreateContentImageButton from './CreateContentImageButton';
import CreateContentVideoButton from './CreateContentVideoButton';
import CreateContentMusicButton from './CreateContentMusicButton';
import { EContentType } from '../../../constants/types';

interface ICreateContentProps {
  contentType: EContentType;
}

export default function CreateContentButton(props: ICreateContentProps) {
  switch (props.contentType) {
    case EContentType.IMAGE:
      return <CreateContentImageButton />;
    case EContentType.VIDEO:
      return <CreateContentVideoButton />;
    case EContentType.MUSIC:
      return <CreateContentMusicButton />;
    default:
      return null;
  }
}
