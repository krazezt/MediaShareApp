import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AlertDialog, Center, Button as RNBaseButton, Icon } from 'native-base';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import uploadImage, { FirebaseFolders } from '../../functions/UploadImage';

export const ChangeAvatarButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  const openImagePicker = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!image.cancelled) {
      setIsOpen(false);
      const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
      const imageURL = await uploadImage(
        image.uri,
        FirebaseFolders.AVATAR,
        filename,
      );
      console.log("Uploaded, imageURL: " + imageURL);
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
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Change Avatar?</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure want to change your avatar?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <RNBaseButton.Group space={2}>
              <RNBaseButton
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </RNBaseButton>
              <RNBaseButton colorScheme="primary" onPress={openImagePicker}>
                Yes, change Avatar.
              </RNBaseButton>
            </RNBaseButton.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};
