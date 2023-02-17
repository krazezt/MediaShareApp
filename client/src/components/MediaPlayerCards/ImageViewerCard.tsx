import React from 'react';
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
import { Entypo } from '@expo/vector-icons';
import ImageViewerButtonGroup from '../Buttons/ImageViewerButtonGroup';
import { VoteState } from '../../constants/types';
import ContentActionButtonGroup from '../Buttons/ContentActionButtonGroup';

export default function ImageViewerCard(props: {
  avatarUri: string;
  contentId: number;
  imageUri: string;
  categories: { name: string }[];
  description: string;
  author: string;
  authorId: number;
  currentVoteState: VoteState;
}) {
  //const categories: string[] = props.categories.map((item) => item.name);
  const categories = ['Category 1', 'Category 2', 'Category 3'];

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
          {/* <Box
            position="absolute"
            top="2"
            right="2"
            bgColor="warmGray.300"
            borderRadius="full"
            zIndex={1}
            padding={1}>
            <ReportContentButton contentId={props.contentId} />
          </Box> */}
          <AspectRatio w="100%" ratio={16 / 9}>
            <NBImage
              source={{
                uri: props.imageUri,
              }}
              alt="image"
            />
          </AspectRatio>
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
            <ImageViewerButtonGroup
              contentId={props.contentId}
              imageUri={props.imageUri}
              authorId={props.authorId}
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
          <ContentActionButtonGroup
            contentId={props.contentId}
            currentVoteState={props.currentVoteState}
          />
        </Stack>
      </Box>
    </Box>
  );
}
