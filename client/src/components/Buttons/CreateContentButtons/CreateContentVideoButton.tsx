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
  useToast,
  Alert as NBAlert,
  VStack,
  Text,
} from 'native-base';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useData, useTranslation } from '../../../hooks';
import * as ImagePicker from 'expo-image-picker';
import { FirebaseFolders } from '../../../constants/config/FirebaseFolders';
import getFileName from '../../../functions/GetFileNameFromURI';
import { ICreateContentImageRequest } from '../../../constants/request-types';
import { IPost, ShareState } from '../../../constants/types';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';
import uploadVideo from '../../../functions/UploadVideo';
import { Video } from 'expo-av';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

export default function CreateContentMusicButton() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const finalRef = React.useRef(null);
  const { t } = useTranslation();
  const toast = useToast();
  const { callAPI, explore, setExplore } = useData();

  const [caption, setCaption] = useState<string>('');
  const [video, setVideo] = useState<ImageInfo | undefined>(undefined);

  // Functions
  const pickVideo = async () => {
    let tmpVideo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!tmpVideo.cancelled) {
      setVideo(tmpVideo);
    }
  };

  const upload = async () => {
    setLoading(true);
    const videoURL = await uploadVideo(
      video,
      FirebaseFolders.VIDEO,
      getFileName(video?.uri || ""),
      callAPI,
    );

    const data: ICreateContentImageRequest = {
      caption: caption,
      mediaURL: videoURL,
      shareState: ShareState.PUBLIC,
      categories: [],
    };

    try {
      const res = await callAPI('CREATE_CONTENT_VIDEO', 'POST', data);
      if (res?.status === 201) {
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
                    {t('common.createVideoContentSuccess')}
                  </Box>
                </VStack>
              </NBAlert>
            );
          },
        });

        explore.push(res.data as IPost);
        setExplore([...explore]);
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
          <Modal.Header>{t('common.createVideoContent')}</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>{t('common.caption')}:</FormControl.Label>
              <Input
                placeholder={t('common.aboutThisVideo') + '...'}
                value={caption}
                onChangeText={(text) => setCaption(text)}
              />
            </FormControl>
            <FormControl mt="3">
              <Box h="150" w="100%" shadow="3" rounded="lg" bg="blue.50">
                {video ? (
                  <Video
                    source={{
                      uri: video.uri,
                    }}
                    status={{ shouldPlay: true }}
                    resizeMode="contain"
                    isLooping
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : null}
                <Fab
                  renderInPortal={false}
                  shadow={2}
                  size="sm"
                  bg="purple.300"
                  onPress={pickVideo}
                  icon={
                    !video ? (
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
                isDisabled={!video}
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
        bg="teal.400"
        colorScheme="teal"
        borderRadius="full"
        icon={
          <Icon
            as={Entypo}
            _dark={{
              color: 'warmGray.50',
            }}
            size="6"
            name="video"
            color="warmGray.50"
          />
        }
        onPress={() => setModalVisible(true)}
      />
    </>
  );
}
