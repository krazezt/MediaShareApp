import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { AxiosError, AxiosResponse } from 'axios';
import { Box, Flex, Icon, IconButton } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { VoteState } from '../../constants/types';
import { useData } from '../../hooks';
import SaveToCollectionButton from './ContentActions/SaveToCollectionButton';
import CommentViewerButton from './ContentActions/CommentViewerButton';

const getNextVoteState = (currentVoteState: VoteState) => {
  switch (currentVoteState) {
    case VoteState.NONE:
      return VoteState.LIKED;
    case VoteState.LIKED:
      return VoteState.NONE;
    // case VoteState.DISLIKED:
    //   return VoteState.NONE;
  }
};

const getVoteButton = (
  currentVoteState: VoteState,
  onPressFunction: () => any,
) => {
  switch (currentVoteState) {
    case VoteState.NONE:
      return (
        <IconButton
          py={1}
          onPress={onPressFunction}
          icon={
            <Icon
              as={AntDesign}
              name="like2"
              size="6rem"
              color="purple.400"
              style={[
                {
                  transform: [{ rotateY: '180deg' }],
                },
              ]}
            />
          }
        />
      );
    case VoteState.LIKED:
      return (
        <IconButton
          py={1}
          onPress={onPressFunction}
          icon={
            <Icon
              as={AntDesign}
              name="like1"
              size="6rem"
              color="purple.400"
              style={[
                {
                  transform: [{ rotateY: '180deg' }],
                },
              ]}
            />
          }
        />
      );
    // case VoteState.DISLIKED:
    //   return (
    //     <Icon
    //       as={AntDesign}
    //       name="like1"
    //       size="6rem"
    //       color="teal.400"
    //       style={[
    //         {
    //           transform: [{ rotateY: '180deg' }, { rotateX: '180deg' }],
    //         },
    //       ]}
    //       onPress={onPressFunction}
    //     />
    //   );
    default:
      return null;
  }
};

export default function ContentActionButtonGroup(props: {
  currentVoteState: VoteState;
  contentId: number;
}) {
  const { callAPI } = useData();

  const [voteState, setVoteState] = useState<VoteState>(VoteState.NONE);

  useEffect(() => {
    setVoteState(props.currentVoteState);
  }, []);

  const changeLikeState = async () => {
    try {
      const data = {
        contentId: props.contentId,
        type: 'UP',
      };

      let res: AxiosResponse<any, any> | undefined;
      switch (voteState) {
        case VoteState.LIKED:
          res = await callAPI('UNVOTE_CONTENT', 'POST', data);
          break;
        case VoteState.NONE:
          res = await callAPI('VOTE_CONTENT', 'POST', data);
          break;
        default:
          break;
      }

      if (res?.status === 200) setVoteState(getNextVoteState(voteState));
    } catch (error) {
      if (error instanceof AxiosError)
        Alert.alert('Error', error.response?.statusText);
    }
  };

  return (
    <Box>
      <Flex
        borderTopWidth="1"
        borderTopColor="blue.100"
        direction={'row'}
        width="100%"
        justifyContent="space-between"
        px={2}>
        <Box marginTop="2">{getVoteButton(voteState, changeLikeState)}</Box>
        <Box marginTop="2">
          <CommentViewerButton contentId={props.contentId} />
        </Box>
        <Box marginTop="2">
          <SaveToCollectionButton
            contentId={props.contentId}
            afterSaving={() => {}}
          />
        </Box>
      </Flex>
    </Box>
  );
}
