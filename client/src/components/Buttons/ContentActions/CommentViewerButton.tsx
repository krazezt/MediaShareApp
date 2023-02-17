import React, { useRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Box,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  Spinner,
  Stack,
} from 'native-base';
import CommentsContainer from '../../Containers/CommentsContainer';
import { IComment } from '../../../constants/types';
import { useData, useTranslation } from '../../../hooks';

export default function CommentViewerButton(props: { contentId: number }) {
  const finalRef = useRef(null);
  const { t } = useTranslation();
  const { callAPI } = useData();

  const [open, setOpen] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<IComment[]>([]);

  const getData = async () => {
    setLoading(true);
    const data = {
      contentId: props.contentId,
    };
    const res = await callAPI('GET_CONTENT_COMMENTS', 'POST', data);

    setComments(res?.data);
    setLoading(false);
  };

  const uploadComment = async () => {
    const data = {
      contentId: props.contentId,
      commentContent: commentContent,
    };
    const res = await callAPI('CREATE_COMMENT', 'POST', data);

    if (res) {
      setCommentContent('');
      getData();
    }
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{t('common.comments')}</Modal.Header>
          <Modal.Body>
            {loading ? (
              <Box height={72}>
                <HStack space={2} justifyContent="center">
                  <Spinner accessibilityLabel="Loading comments" />
                  <Heading color="primary.500" fontSize="md">
                    {t('common.loading')}
                  </Heading>
                </HStack>
              </Box>
            ) : (
              <CommentsContainer comments={comments} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <FormControl>
              <Stack direction="row">
                <Input
                  mt="2"
                  height="10"
                  width="83%"
                  placeholder={t('placeHolder.newComment')}
                  value={commentContent}
                  onChangeText={(text) => setCommentContent(text)}
                />
                <IconButton
                  icon={
                    <Icon
                      as={MaterialCommunityIcons}
                      name={
                        commentContent === '' || loading ? 'send' : 'send-check'
                      }
                      size="6rem"
                      color="purple.400"
                    />
                  }
                  isDisabled={commentContent === '' || loading}
                  onPress={uploadComment}
                />
              </Stack>
            </FormControl>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <IconButton
        py={1}
        onPress={() => {
          getData();
          setOpen(true);
        }}
        icon={
          <Icon
            as={MaterialCommunityIcons}
            name="comment-text-outline"
            size="6rem"
            color="purple.400"
          />
        }
      />
    </>
  );
}
