import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Button, Icon, Input, Modal, useToast } from 'native-base';
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types';
import React, { useState } from 'react';
import { useData, useTranslation } from '../../../../hooks';

export default function JoinCollectionButtonPopover(props: {
  text: string;
  collectionId: number;
  size?: ThemeComponentSizeType<'Icon'>;
  afterJoin?: () => any;
}) {
  const { callAPI } = useData();
  const { t } = useTranslation();
  const toast = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [privateKey, setPrivateKey] = useState<string>('');

  const checkKey = async (): Promise<boolean> => {
    const data = {
      collectionId: props.collectionId,
      privateKey: privateKey,
    };
    const res = await callAPI('JOIN_COLLECTION', 'POST', data);

    return res !== undefined;
  };

  const submit = async () => {
    setLoading(true);

    const keyTrue = await checkKey();

    setOpen(false);
    setPrivateKey('');
    setLoading(false);

    if (keyTrue) {
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="3" rounded="sm" mb={5}>
              {t('common.joined')}
            </Box>
          );
        },
      });
      if (props.afterJoin) props.afterJoin();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{t('headers.enterKey')}</Modal.Header>
          <Modal.Body>
            <Input
              isFullWidth
              placeholder={t('placeHolder.enterKey')}
              value={privateKey}
              onChangeText={(text) => setPrivateKey(text)}
            />
            <Button
              mt={2}
              width={16}
              alignSelf="flex-end"
              isLoading={loading}
              disabled={!privateKey.length}
              bgColor={!privateKey.length ? 'gray.400' : 'purple.400'}
              onPress={submit}>
              {t('common.ok')}
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Button
        variant="subtle"
        colorScheme="blue"
        size={props.size}
        startIcon={
          <Icon
            as={MaterialCommunityIcons}
            size={props.size}
            name="folder-lock-open"
          />
        }
        onPress={handleOpen}>
        {props.text}
      </Button>
    </>
  );
}
