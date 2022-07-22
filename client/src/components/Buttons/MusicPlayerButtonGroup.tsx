import React, { useState } from 'react';
import { Stack, Center, Icon } from 'native-base';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useData } from '../../hooks';

const btnSize = 10;

export default function MusicPlayerButtonGroup(props: {
  contentId: number;
  audioUri: string;
}) {
  const { playSound, stopSound, playingMusicId } = useData();

  const playMusic = async () => {
    await playSound(props.contentId, props.audioUri);
  };

  const pauseMusic = async () => {
    await stopSound();
  };

  return (
    <Center width="100%" alignItems="center">
      <Stack direction="row" space={5}>
        <Center size={btnSize}>
          <Icon as={Entypo} name="menu" size="7rem" color="violet.400" />
        </Center>
        <Center size={btnSize}>
          {playingMusicId === props.contentId ? (
            <Icon
              as={Ionicons}
              name="pause"
              size="6rem"
              color="violet.400"
              onPress={pauseMusic}
            />
          ) : (
            <Icon
              as={Entypo}
              name="controller-play"
              size="7rem"
              color="violet.400"
              onPress={playMusic}
            />
          )}
        </Center>
      </Stack>
    </Center>
  );
}
