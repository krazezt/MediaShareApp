import React, { useState } from 'react';
import {
  Modal,
  Button,
  Input,
  FormControl,
  IconButton,
  Icon,
  Box,
  Fab,
  Image,
  useToast,
  Alert as NBAlert,
  VStack,
  Text,
} from 'native-base';
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useData, useTranslation } from '../../../hooks';
import * as ImagePicker from 'expo-image-picker';
import uploadImage from '../../../functions/UploadImage';
import { FirebaseFolders } from '../../../constants/config/FirebaseFolders';
import getFileName from '../../../functions/GetFileNameFromURI';
import { ICreateContentImageRequest } from '../../../constants/request-types';
import { ShareState } from '../../../constants/types';
import { AxiosError, AxiosResponse } from 'axios';
import { Alert } from 'react-native';

export default function CreateContentImageButton() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const finalRef = React.useRef(null);
  const { t } = useTranslation();
  const { callAPI } = useData();
  const toast = useToast();

  const [caption, setCaption] = useState<string>('');
  const [image, setImage] = useState<string>('');

  // Functions
  const pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!image.cancelled) {
      setImage(image.uri);
    }
  };

  const upload = async () => {
    setLoading(true);
    const imageURL = await uploadImage(
      image,
      FirebaseFolders.IMAGE,
      getFileName(image),
    );
    const data: ICreateContentImageRequest = {
      caption: caption,
      mediaURL: imageURL,
      shareState: ShareState.PUBLIC,
      categories: ['Game', 'Meme', 'Fun'],
    };

    try {
      const res = await callAPI('CREATE_CONTENT_IMAGE', 'POST', data);
      if (res.status === 201) {
        setModalVisible(false);
        toast.show({
          render: () => {
            return (
              <NBAlert w="80%" status="success" alignSelf="center">
                <VStack space={1} flexShrink={1} w="100%" alignItems="center">
                  <NBAlert.Icon size="md" />
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    _dark={{
                      color: 'coolGray.800',
                    }}>
                    {t('common.success')}
                  </Text>

                  <Box
                    _text={{
                      textAlign: 'center',
                    }}
                    _dark={{
                      _text: {
                        color: 'coolGray.600',
                      },
                    }}>
                    {t('common.createImageContentSuccess')}
                  </Box>
                </VStack>
              </NBAlert>
            );
          },
        });
      }
    } catch (error) {
      if (error instanceof AxiosError)
        Alert.alert('Error', error.response?.statusText);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.Header>{t('common.createImageContent')}</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>{t('common.caption')}:</FormControl.Label>
              <Input
                placeholder={t('common.aboutThisImage') + '...'}
                value={caption}
                onChangeText={(text) => setCaption(text)}
              />
            </FormControl>
            <FormControl mt="3">
              <Box h="150" w="100%" shadow="3" rounded="lg" bg="blue.50">
                {image ? (
                  <Image
                    source={{
                      uri: image,
                    }}
                    alt="Alternate Text"
                    w="100%"
                    h="100%"
                    rounded="lg"
                  />
                ) : null}
                <Fab
                  renderInPortal={false}
                  shadow={2}
                  size="sm"
                  bg="purple.300"
                  onPress={pickImage}
                  icon={
                    image === '' ? (
                      <Icon
                        color="blue.400"
                        as={<Entypo name="upload" />}
                        size="sm"
                      />
                    ) : (
                      <Icon
                        color="blue.400"
                        as={<FontAwesome5 name="sync" />}
                        size="sm"
                      />
                    )
                  }
                />
              </Box>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                isDisabled={loading}
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                {t('common.cancel')}
              </Button>
              <Button
                isDisabled={image === ''}
                isLoading={loading}
                onPress={upload}>
                {t('common.upload')}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <IconButton
        mb="4"
        variant="solid"
        bg="red.500"
        colorScheme="red"
        borderRadius="full"
        onPress={() => {
          setModalVisible(true);
        }}
        icon={
          <Icon
            as={MaterialIcons}
            size="6"
            name="photo-library"
            _dark={{
              color: 'warmGray.50',
            }}
            color="warmGray.50"
          />
        }
      />
    </>
  );
}
