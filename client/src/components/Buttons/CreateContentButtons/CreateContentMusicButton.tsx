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
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useData, useTranslation } from '../../../hooks';
import { FirebaseFolders } from '../../../constants/config/FirebaseFolders';
import getFileName from '../../../functions/GetFileNameFromURI';
import { ICreateContentImageRequest } from '../../../constants/request-types';
import { ShareState } from '../../../constants/types';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import uploadAudio from '../../../functions/UploadAudio';

export default function CreateContentMusicButton() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const finalRef = React.useRef(null);
  const { t } = useTranslation();
  const { callAPI } = useData();
  const toast = useToast();

  const [caption, setCaption] = useState<string>('');
  const [audio, setAudio] = useState<string>('');

  // Functions
  const pickAudio = async () => {
    let tmpAudio = await DocumentPicker.getDocumentAsync({
      type: 'audio/mpeg',
    });

    if (tmpAudio.type === 'success') {
      setAudio(tmpAudio.uri);
    }
  };

  const upload = async () => {
    setLoading(true);
    const imageURL = await uploadAudio(
      audio,
      FirebaseFolders.MUSIC,
      getFileName(audio),
    );
    const data: ICreateContentImageRequest = {
      caption: caption,
      mediaURL: imageURL,
      shareState: ShareState.PUBLIC,
      categories: ['Game', 'Meme', 'Fun'],
    };

    try {
      const res = { status: 201 }; // await callAPI('CREATE_CONTENT_IMAGE', 'POST', data);
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
                    {t('common.createMusicContentSuccess')}
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
          <Modal.Header>{t('common.createMusicContent')}</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>{t('common.caption')}:</FormControl.Label>
              <Input
                placeholder={t('common.aboutThisMusicTrack') + '...'}
                value={caption}
                onChangeText={(text) => setCaption(text)}
              />
            </FormControl>
            <FormControl mt="3">
              <Box h="150" w="100%" shadow="3" rounded="lg" bg="blue.50">
                {/* {audio ? (
                  <Video
                    source={{
                      uri: audio,
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : null} */}
                <Fab
                  renderInPortal={false}
                  shadow={2}
                  size="sm"
                  bg="purple.300"
                  onPress={pickAudio}
                  icon={
                    audio === '' ? (
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
                isDisabled={audio === ''}
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
        bg="indigo.500"
        colorScheme="indigo"
        borderRadius="full"
        icon={
          <Icon
            as={Entypo}
            _dark={{
              color: 'warmGray.50',
            }}
            size="6"
            name="folder-music"
            color="warmGray.50"
          />
        }
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </>
  );
}
