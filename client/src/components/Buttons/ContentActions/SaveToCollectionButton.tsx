import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Modal,
  ScrollView,
  Spinner,
  Stack,
  Text,
  useToast,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { ICollection, VoteState } from '../../../constants/types';
import { useData, useTranslation } from '../../../hooks';
import CollectionInCreateModal from '../../Collection/Modals/CollectionInCreateModal';
import PostCard from '../../MediaPlayerCards/PostCard';

export default function SaveToCollectionButton(props: {
  contentId: number;
  afterSaving: () => any;
}) {
  const { t } = useTranslation();
  const { callAPI } = useData();
  const toast = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [collection, setCollection] = useState<ICollection | undefined>(
    undefined,
  );

  const [collectionStack, setCollectionStack] = useState<
    (ICollection | undefined)[]
  >([]);

  // Handle open, close actions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  useEffect(() => {
    const getRootCollections = async () => {
      const res = await callAPI('GET_ROOT_COLLECTIONS', 'GET');

      if (res) {
        const rootCollection: ICollection = {
          author: {
            avatarURL: '',
            id: 0,
            name: '',
          },
          collection: {
            id: 0,
            createdAt: '',
            title: '',
            childs: res.data.map((item: any) => item.content.collection),
            posts: [],
          },
          votes: [],
        };

        collectionStack.splice(0, collectionStack.length);
        setCollection(rootCollection);
      }
    };

    getRootCollections();
  }, [open]);

  const saveToCollection = async (): Promise<boolean> => {
    const data = {
      collectionId: collection?.collection.id,
      postId: props.contentId,
    };

    const res = await callAPI('ADD_POST_TO_COLLECTION', 'POST', data);

    return res !== undefined;
  };

  const submit = async () => {
    setSubmitting(true);

    const isSuccess = await saveToCollection();

    handleCloseConfirmModal();
    handleClose();
    setSubmitting(false);

    if (isSuccess) {
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="3" rounded="sm" mb={5}>
              {t('common.contentSaved')}
            </Box>
          );
        },
      });
      props.afterSaving();
    }
  };

  const setCurrentCollection = (newCollection: ICollection) => {
    collectionStack.push(collection);
    setCollectionStack([...collectionStack]);
    setCollection(newCollection);
  };

  const navigateCollection = async (collectionId: number) => {
    setLoading(true);
    const data = {
      collectionId: collectionId,
    };
    const res = await callAPI('GET_COLLECTION_INFO', 'POST', data);

    if (res) {
      setCurrentCollection(res.data.content);
    }
    setLoading(false);
  };

  const navigateBack = () => {
    if (collectionStack.length === 0) return;
    setCollection(collectionStack.pop());
    setCollectionStack([...collectionStack]);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={handleClose}
        width="113%"
        alignSelf="center">
        <Modal.Content>
          <Modal isOpen={openConfirmModal} onClose={handleCloseConfirmModal}>
            <Modal.Content>
              <Modal.Header>
                {t('headers.confirmSaveToCollection')}
              </Modal.Header>
              <Modal.Body>
                <Box width="60%" alignSelf="flex-end">
                  <Stack
                    direction="row"
                    space={3}
                    justifyContent="space-between">
                    <Button
                      width={16}
                      colorScheme="purple"
                      isLoading={submitting}
                      variant="outline"
                      onPress={() => setOpenConfirmModal(false)}>
                      {t('common.cancel')}
                    </Button>
                    <Button
                      width={16}
                      bgColor="purple.400"
                      isLoading={submitting}
                      onPress={() => submit()}>
                      {t('common.ok')}
                    </Button>
                  </Stack>
                </Box>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <Modal.CloseButton />
          <Modal.Header>
            {loading ? (
              <Box height={5} />
            ) : !collection?.author.id ? (
              <Box height={5}>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  _dark={{
                    color: 'coolGray.800',
                  }}
                  color="gray.500">
                  {t('common.root')}
                </Text>
              </Box>
            ) : (
              <Box height={7} display="flex">
                <Stack direction="row" space={1} display="flex">
                  <Avatar
                    position="relative"
                    size={10}
                    bg="green.500"
                    borderStyle="solid"
                    borderWidth="1"
                    borderColor="gray.400"
                    source={{
                      uri: collection?.author.avatarURL,
                    }}
                  />
                  <Text
                    fontSize="md"
                    fontWeight="bold"
                    underline
                    _dark={{
                      color: 'coolGray.800',
                    }}
                    color="gray.500">
                    {collection?.author.name}
                  </Text>
                </Stack>
                <Box alignItems="flex-end">
                  <Box paddingX="1" width="85%" bottom="5" minHeight="5">
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      _dark={{
                        color: 'coolGray.800',
                      }}
                      color="gray.500">
                      {collection?.collection.title}
                    </Text>
                  </Box>
                </Box>
              </Box>
            )}
          </Modal.Header>
          <Modal.Body padding={2}>
            <Box height={96}>
              {loading ? (
                <HStack space={2} justifyContent="center">
                  <Spinner accessibilityLabel="Loading comments" />
                  <Heading color="primary.500" fontSize="md">
                    {t('common.loading')}
                  </Heading>
                </HStack>
              ) : (
                <ScrollView>
                  <Box>
                    <Stack
                      marginBottom={1}
                      direction="row"
                      alignContent="center"
                      justifyContent="space-between"
                      display="flex">
                      <Text fontSize="lg" fontWeight="bold" color="gray.400">
                        {t('common.childCollections')}
                      </Text>
                      <Icon
                        as={Entypo}
                        name="arrow-long-right"
                        color="purple.400"
                        size="md"
                      />
                    </Stack>
                    <Box>
                      <ScrollView horizontal={true} paddingBottom={1}>
                        <Stack direction="row" space={3}>
                          {collection?.collection.childs.map((item) => {
                            const currVoteState: VoteState =
                              item.content.votes.length === 0
                                ? VoteState.NONE
                                : VoteState.LIKED;

                            return (
                              <CollectionInCreateModal
                                avatarUri={item.content.author.avatarURL}
                                contentId={item.id}
                                categories={item.content.categories}
                                key={item.id}
                                currentVoteState={currVoteState}
                                authorId={item.content.author.id}
                                title={item.title}
                                onPress={() => navigateCollection(item.id)}
                              />
                            );
                          })}
                        </Stack>
                      </ScrollView>
                    </Box>
                  </Box>
                  <Box height={4} />
                  <Box>
                    <Stack
                      marginBottom={1}
                      direction="row"
                      alignContent="center"
                      justifyContent="space-between"
                      display="flex">
                      <Text fontSize="lg" fontWeight="bold" color="gray.400">
                        {t('common.posts')}
                      </Text>
                      <Icon
                        as={Entypo}
                        name="arrow-long-right"
                        color="purple.400"
                        size="md"
                      />
                    </Stack>
                    <Box>
                      <ScrollView horizontal={true} paddingBottom={1}>
                        <Stack direction="row" space={3}>
                          {collection?.collection.posts.map((item) => {
                            const currVoteState: VoteState =
                              item.post.content.votes.length === 0
                                ? VoteState.NONE
                                : VoteState.LIKED;

                            return (
                              <PostCard
                                authorId={item.post.content.author.id}
                                authorName={item.post.content.author.name}
                                avatarUri={item.post.content.author.avatarURL}
                                categories={item.post.content.categories}
                                contentId={item.post.id}
                                description={item.post.caption}
                                mediaURL={item.post.mediaURL}
                                key={item.post.id}
                                type={item.post.type}
                                currentVoteState={currVoteState}
                              />
                            );
                          })}
                        </Stack>
                      </ScrollView>
                    </Box>
                  </Box>
                </ScrollView>
              )}
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={4}>
              <Button
                variant="outline"
                colorScheme="purple"
                disabled={collectionStack.length === 0}
                onPress={navigateBack}
                startIcon={<Icon as={Entypo} name="arrow-left" />}>
                {t('common.back')}
              </Button>
              <Button
                variant="solid"
                disabled={collectionStack.length === 0}
                bgColor={
                  collectionStack.length === 0 ? 'gray.300' : 'purple.400'
                }
                onPress={handleOpenConfirmModal}>
                {t('common.saveHere')}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <IconButton
        py={1}
        onPress={handleOpen}
        icon={
          <Icon
            as={MaterialCommunityIcons}
            name="bookmark-check-outline"
            size="6rem"
            color="purple.400"
          />
        }
      />
    </>
  );
}
