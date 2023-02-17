import React, { useState } from 'react';
import {
  Box,
  AspectRatio,
  Image as NBImage,
  Stack,
  Avatar,
  Text,
  Button,
} from 'native-base';
import CollectionActionGroup from '../../Buttons/CollectionActionButtonGroup';
import { VoteState } from '../../../constants/types';
import CollectionInfoModal from '../Modals/CollectionInfoModal';

export default function ProfileCollectionMe(props: {
  avatarUri: string | undefined;
  contentId: number;
  authorId: number;
  imageUri?: string;
  categories: { name: string }[];
  currentVoteState: VoteState;
  title: string;
  onCollectionClose?: () => any;
}) {
  //const categories: string[] = props.categories.map((item) => item.name);
  const thumbnail =
    props.imageUri ||
    'http://images.squarespace-cdn.com/content/v1/5336f9ebe4b00209e20806c1/1604069548152-VXQI49220L29NBADWQGM/logo.jpg';

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    if (props.onCollectionClose) props.onCollectionClose();
  };

  return (
    <>
      <CollectionInfoModal.Me isOpen={modalOpen} onClose={handleClose} collectionId={props.contentId}/>
      <Box alignItems="center">
        <Box
          maxW="72"
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
          <Button padding={0} onPress={handleOpen}>
            <AspectRatio w="100%" ratio={16 / 9}>
              <NBImage
                source={{
                  uri: thumbnail,
                }}
                alt="image"
              />
            </AspectRatio>
            <Avatar
              position="absolute"
              size="md"
              bg="green.500"
              top="4"
              left="4"
              borderStyle="solid"
              borderWidth="2"
              borderColor="gray.50"
              source={{
                uri: props.avatarUri,
              }}
            />
          </Button>
          <Stack p="4" space={3}>
            <Text fontSize="lg" fontWeight="bold" color="gray.500">
              {props.title.length >= 36
                ? `${props.title.slice(0, 33)}...`
                : props.title}
            </Text>
            <CollectionActionGroup.Me
              contentId={props.contentId}
              currentVoteState={props.currentVoteState}
              authorId={props.authorId}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
