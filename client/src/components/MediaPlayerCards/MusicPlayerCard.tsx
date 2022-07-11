import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Stack,
  Avatar,
  Icon,
} from 'native-base';
import MusicPlayerButtonGroup from '../Buttons/MusicPlayerButtonGroup';
import { AntDesign } from '@expo/vector-icons';

enum VoteState {
  NONE,
  LIKED,
  DISLIKED,
}

const getNextVoteState = (currentVoteState: VoteState) => {
  switch (currentVoteState) {
    case VoteState.NONE:
      return VoteState.LIKED;
    case VoteState.LIKED:
      return VoteState.DISLIKED;
    case VoteState.DISLIKED:
      return VoteState.NONE;
  }
};

const getVoteButton = (currentVoteState: VoteState, onPressFunction: () => any) => {
  switch (currentVoteState) {
    case VoteState.NONE:
      return (
        <Icon
          position="absolute"
          top="10px"
          right="10px"
          as={AntDesign}
          name="like2"
          size="6rem"
          color="teal.400"
          style={[
            {
              transform: [{ rotateY: '180deg' }],
            },
          ]}
          onPress={onPressFunction}
        />
      );
    case VoteState.LIKED:
      return (
        <Icon
          position="absolute"
          top="10px"
          right="10px"
          as={AntDesign}
          name="like1"
          size="6rem"
          color="teal.400"
          style={[
            {
              transform: [{ rotateY: '180deg' }],
            },
          ]}
          onPress={onPressFunction}
        />
      );
    case VoteState.DISLIKED:
      return (
        <Icon
          position="absolute"
          top="10px"
          right="10px"
          as={AntDesign}
          name="like1"
          size="6rem"
          color="teal.400"
          style={[
            {
              transform: [{ rotateY: '180deg' }, { rotateX: '180deg' }],
            },
          ]}
          onPress={onPressFunction}
        />
      );
    default:
      return null;
  }
};

export default function MusicPlayerCard(props: {contentId: number, audioUri: string}) {
  const [voteState, setVoteState] = useState<VoteState>(VoteState.NONE);

  const changeLikeState = () => {
    setVoteState(getNextVoteState(voteState));
  };

  const categories: string[] = ['Anime Music', 'Opening', 'Meme material'];
  return (
    <Box alignItems="center">
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Box height="220px">
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/test-native-e5a43.appspot.com/o/Assets%2Fmusic.png?alt=media&token=d0bd8303-7a2b-4a44-aa34-ce95a4f8c46a',
              }}
              alt="image"
            />
          </AspectRatio>
          {getVoteButton(voteState, changeLikeState)}
          <Avatar
            position="relative"
            size="xl"
            bg="green.500"
            bottom="10"
            left="8"
            borderStyle="solid"
            borderWidth="4"
            borderColor="gray.50"
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/test-native-e5a43.appspot.com/o/Avatars%2F001.jpg?alt=media&token=9b73b7e7-5396-4e76-a425-619a600ee2b8',
            }}
          />
          <Box
            position="relative"
            bottom="24"
            left="32"
            width="40"
            pt={2}
            pb={2}>
            <MusicPlayerButtonGroup
              contentId={props.contentId}
              audioUri={props.audioUri}
            />
          </Box>
        </Box>
        <Stack p="4" space={3} mt="-3">
          <Stack space={1}>
            <Heading size="md" ml="-1">
              Author name here
            </Heading>
          </Stack>
          <Text fontWeight="900" ml="-1" mt="-1">
            Here is the description for this music track, no rule, just anything
            about this track...
          </Text>
          <Stack direction="row" space={3}>
            {categories.map((item, index) => (
              <Box borderRadius="lg" bgColor="violet.300" key={index}>
                <Text
                  fontSize="xs"
                  _light={{
                    color: 'violet.500',
                  }}
                  _dark={{
                    color: 'violet.400',
                  }}
                  fontWeight="500"
                  px={1}>
                  {item}
                </Text>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
