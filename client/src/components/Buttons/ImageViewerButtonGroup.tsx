import React, { useState } from 'react';
import { Stack, Center, Icon, Modal, Box } from 'native-base';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer-fixed';
import ContentSubMenuButton from './ContentActions/ContentSubMenuButton';

const btnSize = 10;

export default function ImageViewerButtonGroup(props: {
  contentId: number;
  imageUri: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const fullScreen = () => {
    setOpen(true);
  };
  const image = [
    {
      url: props.imageUri,
    },
  ];

  return (
    <>
      <Modal isOpen={open} animationPreset="slide">
        <Modal.CloseButton
          onPress={() => {
            setOpen(false);
          }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          bgColor="black"
          w="100%"
          h="100%"
          opacity={80}
        />
        <ImageViewer
          imageUrls={image}
          onSwipeDown={() => {
            setOpen(false);
          }}
          swipeDownThreshold={10}
          enableImageZoom
          enableSwipeDown
        />
      </Modal>
      <Center width="100%" alignItems="center">
        <Stack direction="row" space={5}>
          <Center size={btnSize}>
            <ContentSubMenuButton contentId={props.contentId} size={12}/>
          </Center>
          <Center size={btnSize}>
            <Icon
              as={MaterialIcons}
              name="fullscreen"
              size="7rem"
              color="violet.400"
              onPress={fullScreen}
            />
          </Center>
        </Stack>
      </Center>
    </>
  );
}
