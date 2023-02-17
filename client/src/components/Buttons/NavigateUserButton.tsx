import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Icon } from 'native-base';
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types';
import { useNavigation } from '@react-navigation/core';
import { useTranslation } from '../../hooks';

export default function NavigateUserButton(props: {
  userId: number;
  text: string;
  size?: ThemeComponentSizeType<'Icon'>;
}) {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <Button
      variant="subtle"
      colorScheme="purple"
      size={props.size}
      startIcon={<Icon as={FontAwesome} size={props.size} name="user-circle" />}
      onPress={() =>
        navigation.navigate(t('screens.otherProfile'), {
          userId: props.userId,
        })
      }>
      {props.text}
    </Button>
  );
}
