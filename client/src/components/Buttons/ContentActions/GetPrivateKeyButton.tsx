import React from 'react';
import { ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Button, Icon, Text, useToast } from 'native-base';
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types';
import { useData, useTranslation } from '../../../hooks';
import * as Clipboard from 'expo-clipboard';

export default function GetPrivateKeyButton(props: {
  contentId: number;
  size?: ThemeComponentSizeType<'Icon'>;
}) {
  const { t } = useTranslation();
  const { callAPI } = useData();
  const toast = useToast();

  const getPrivateKey = async () => {
    const data = {
      contentId: props.contentId,
    };
    const res = await callAPI('GET_PRIVATE_KEY', 'POST', data);

    if (res) {
      Clipboard.setString(res?.data.content.privateKey);
      ToastAndroid.showWithGravityAndOffset(
        t('common.keySaved'),
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };

  return (
    <Button
      variant="subtle"
      colorScheme="cyan"
      size={props.size}
      startIcon={
        <Icon as={MaterialCommunityIcons} size={props.size} name="folder-key" />
      }
      onPress={getPrivateKey}>
      {t('common.getKey')}
    </Button>
  );
}
