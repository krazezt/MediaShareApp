import { Entypo } from '@expo/vector-icons';
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  Radio,
  ScrollView,
  Spinner,
  Stack,
  Text,
  useToast,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { ICollection, ShareState, VoteState } from '../../../constants/types';
import { useData, useTranslation } from '../../../hooks';
import CollectionInCreateModal from '../../Collection/Modals/CollectionInCreateModal';
import PostCard from '../../MediaPlayerCards/PostCard';

export default function CreateCollectionButton(props: {
  afterCreate: () => any;
}) {
  const { t } = useTranslation();
  const { callAPI } = useData();
  const toast = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [openNameInput, setOpenNameInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [collectionName, setCollectionName] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [shareState, setShareState] = useState<string>(
    ShareState.PUBLIC.valueOf(),
  );
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

  const handleOpenNameInput = () => {
    setOpenNameInput(true);
  };

  const handleCloseNameInput = () => {
    setOpenNameInput(false);
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

  const createCollection = async (): Promise<boolean> => {
    const data = {
      title: collectionName,
      shareState: shareState,
      parentId: !collection ? 0 : collection.collection.id,
    };

    const res = callAPI('CREATE_COLLECTION', 'POST', data);

    return res !== undefined;
  };

  const submit = async () => {
    setSubmitting(true);

    const isSuccess = await createCollection();

    setCollectionName('');
    handleCloseNameInput();
    handleClose();
    setSubmitting(false);

    if (isSuccess) {
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="3" rounded="sm" mb={5}>
              {t('common.collectionCreated')}
            </Box>
          );
        },
      });
      props.afterCreate();
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
          <Modal isOpen={openNameInput} onClose={handleCloseNameInput}>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>{t('headers.createCollection')}</Modal.Header>
              <Modal.Body>
                <Stack direction="column" space={3}>
                  <Input
                    placeholder={t('placeHolder.collectionName')}
                    w="100%"
                    value={collectionName}
                    onChangeText={(text) => setCollectionName(text)}
                  />
                  <Radio.Group
                    value={shareState}
                    defaultValue={ShareState.PUBLIC.valueOf()}
                    onChange={(value) => {
                      console.log(value);
                      setShareState(value);
                    }}
                    name="shareState">
                    <Stack direction="row" space={3}>
                      <Radio value={ShareState.PUBLIC.valueOf()} my={1}>
                        Public
                      </Radio>
                      <Radio value={ShareState.SHARE.valueOf()} my={1}>
                        Shared
                      </Radio>
                      <Radio value={ShareState.PRIVATE.valueOf()} my={1}>
                        Private
                      </Radio>
                    </Stack>
                  </Radio.Group>
                  <Button
                    width={16}
                    isLoading={submitting}
                    alignSelf="flex-end"
                    onPress={() => submit()}>
                    {t('common.ok')}
                  </Button>
                </Stack>
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
                disabled={collectionStack.length === 0}
                onPress={navigateBack}
                startIcon={<Icon as={Entypo} name="arrow-left" />}>
                {t('common.back')}
              </Button>
              <Button
                variant="solid"
                minWidth={12}
                onPress={handleOpenNameInput}>
                {t('common.createHere')}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <IconButton
        colorScheme="purple"
        size="lg"
        padding={1}
        variant="outline"
        width={16}
        height={7}
        onPress={handleOpen}
        icon={<Icon as={Entypo} name="plus" size={7} />}
      />
    </>
  );
}
