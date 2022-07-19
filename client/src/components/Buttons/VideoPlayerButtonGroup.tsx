import React, { useState } from 'react';
import { Stack, Center, Icon, Modal, Box } from 'native-base';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const btnSize = 10;

export default function VideoPlayerButtonGroup(props: {
  contentId: number;
  videoUri: string;
  videoRef: Video | null;
}) {
  const fullscreen = async () => {
    await props.videoRef?.presentFullscreenPlayerAsync();
    await props.videoRef?.setIsMutedAsync(false)
  }

  return (
    <>
      <Center width="100%" alignItems="center">
        <Stack direction="row" space={5}>
          <Center size={btnSize}>
            <Icon as={Entypo} name="menu" size="7rem" color="violet.400" />
          </Center>
          <Center size={btnSize}>
            <Icon
              as={MaterialIcons}
              name="fullscreen"
              size="7rem"
              color="violet.400"
              onPress={fullscreen}
            />
          </Center>
        </Stack>
      </Center>
    </>
  );
}
