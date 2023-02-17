import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  Modal,
  ScrollView,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import { useData, useTranslation } from '../../../hooks';
import { ICollection, VoteState } from '../../../constants/types';
import CollectionActionGroup from '../../Buttons/CollectionActionButtonGroup';
import ProfileCollection from '../ProfileCollection/ProfileCollection';
import { Entypo } from '@expo/vector-icons';
import PostCard from '../../MediaPlayerCards/PostCard';

export default function CollectionInfoModalOther(props: {
  isOpen: boolean;
  onClose: () => any;
  collectionId: number;
}) {
  const { t } = useTranslation();
  const { callAPI } = useData();

  const [accessible, setAccessible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<ICollection | undefined>(
    undefined,
  );

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = {
        collectionId: props.collectionId,
      };
      const res = await callAPI(
        'GET_COLLECTION_INFO',
        'POST',
        data,
        false,
        false,
      );

      if (res) setAccessible(true);

      setCollection(res?.data.content);
      setLoading(false);
    };

    getData();
  }, [props.isOpen]);

  const handleClose = () => {
    props.onClose();
  };

  if (!accessible) return <></>;

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      minWidth="113%"
      alignSelf="center">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header padding={1} paddingLeft={2} height={12}>
          {loading ? (
            <Box height={5} />
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
          {loading ? (
            <Box height={96}>
              <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading comments" />
                <Heading color="primary.500" fontSize="md">
                  {t('common.loading')}
                </Heading>
              </HStack>
            </Box>
          ) : (
            <Box height={96}>
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
                            <ProfileCollection.Other
                              avatarUri={item.content.author.avatarURL}
                              contentId={item.id}
                              categories={item.content.categories}
                              key={item.id}
                              currentVoteState={currVoteState}
                              authorId={item.content.author.id}
                              title={item.title}
                            />
                          );
                        })}
                      </Stack>
                    </ScrollView>
                  </Box>
                </Box>
                <Box height={5} />
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
            </Box>
          )}
        </Modal.Body>
        <Modal.Footer padding={0}>
          {!collection ? null : (
            <Box width="full" paddingBottom={2}>
              <CollectionActionGroup.Other
                authorId={collection.author.id}
                contentId={collection.collection.id}
                currentVoteState={
                  collection.votes.length === 0
                    ? VoteState.NONE
                    : VoteState.LIKED
                }
              />
            </Box>
          )}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
