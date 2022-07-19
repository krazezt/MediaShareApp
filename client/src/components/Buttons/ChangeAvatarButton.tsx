import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AlertDialog,
  Center,
  Button as RNBaseButton,
  Icon,
  useToast,
  Box,
} from 'native-base';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import uploadImage from '../../functions/UploadImage';
import { FirebaseFolders } from '../../constants/config/FirebaseFolders';
import { useData, useTranslation } from '../../hooks';

export const ChangeAvatarButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { callAPI, handleUser } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  const openImagePicker = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!image.cancelled) {
      setIsLoading(true);
      const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
      const imageURL = await uploadImage(
        image.uri,
        FirebaseFolders.AVATAR,
        filename,
      );

      const res = await callAPI('CHANGE_AVATAR', 'POST', {
        avatarURL: imageURL,
      });
      handleUser({
        id: 1,
        name: res?.data.name,
        department: 'EMT ~!',
        stats: {
          posts: 0,
          followers: 0,
          following: 0,
        },
        about: 'About me!',
        avatar: res?.data.avatarURL,
        social: { twitter: 'https://twitter.com/krazezt' },
      });
      setIsLoading(false);
      setIsOpen(false);
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="3" rounded="sm" mb={5}>
              {t('profile.changeAvatarSuccess')}
            </Box>
          );
        },
      });
    }
  };

  return (
    <Center>
      <Icon
        as={MaterialCommunityIcons}
        name="account-edit-outline"
        color="white"
        size="xl"
        onPress={() => setIsOpen(true)}
      />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton isDisabled={isLoading} />
          <AlertDialog.Header>Change Avatar?</AlertDialog.Header>
          <AlertDialog.Body>
            {t('profile.changeAvatarWarning')}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <RNBaseButton.Group space={2}>
              <RNBaseButton
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
                isDisabled={isLoading}>
                {t('common.cancel')}
              </RNBaseButton>
              <RNBaseButton
                colorScheme="primary"
                onPress={openImagePicker}
                isLoading={isLoading}>
                {t('profile.changeAvatarConfirm')}
              </RNBaseButton>
            </RNBaseButton.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};
