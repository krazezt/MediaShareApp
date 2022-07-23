import React, { useState } from 'react';
import {
  Box,
  Heading,
  AspectRatio,
  Image as NBImage,
  Text as NBText,
  Stack,
  Avatar,
  Icon,
  ScrollView,
  Center,
  Button,
} from 'native-base';
import MusicPlayerButtonGroup from '../Buttons/MusicPlayerButtonGroup';
import { AntDesign, Entypo } from '@expo/vector-icons';

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

const getVoteButton = (
  currentVoteState: VoteState,
  onPressFunction: () => any,
) => {
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

export default function MusicPlayerCard(props: {
  avatarUri: string;
  contentId: number;
  audioUri: string;
  categories: { name: string }[];
  description: string;
  author: string;
}) {
  const [voteState, setVoteState] = useState<VoteState>(VoteState.NONE);

  const changeLikeState = () => {
    setVoteState(getNextVoteState(voteState));
  };

  const categories: string[] = props.categories.map((item) => item.name);
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
            <NBImage
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
              uri: props.avatarUri,
            }}
          />
          <Box
            position="relative"
            bottom="24"
            left="3/6"
            width="40"
            pt={2}
            pb={2}>
            <MusicPlayerButtonGroup
              contentId={props.contentId}
              audioUri={props.audioUri}
            />
          </Box>
        </Box>
        <Stack p="4" space={3} mt="-1">
          <Stack space={1}>
            <Heading size="md" ml="-1">
              {props.author}
            </Heading>
          </Stack>
          <NBText fontWeight="900" ml="-1" mt="-1">
            {props.description}
          </NBText>
          <Stack direction="row">
            <ScrollView
              horizontal
              maxH="6"
              maxW="80%"
              pt={1}
              pb={1}
              persistentScrollbar={false}>
              <Stack direction="row" space={3}>
                {categories.map((item, index) => (
                  <Box borderRadius="lg" bgColor="violet.300" key={index}>
                    <NBText
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
                    </NBText>
                  </Box>
                ))}
              </Stack>
            </ScrollView>
            <Center w="20%">
              <Button
                variant="ghost"
                colorScheme="violet"
                p={0}
                position="absolute"
                right={0}
                rightIcon={
                  <Icon as={Entypo} name="arrow-long-right" size="md" />
                }></Button>
            </Center>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
