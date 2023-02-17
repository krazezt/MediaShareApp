import React, { useState } from 'react';
import { Box, Button, Input, Modal, Stack } from 'native-base';
import { useTranslation } from '../../../hooks';

export default function CollectionNameInputModal(props: {
  isOpen: boolean;
  parentId: number;
  submit: (parentId: number, collectionName: string) => Promise<any>;
  onClose: () => any;
}) {
  const { t } = useTranslation();

  const [collectionName, setCollectionName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);

    await props.submit(props.parentId, collectionName);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
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
            <Button
              width={16}
              isLoading={loading}
              alignSelf="flex-end"
              onPress={handleSubmit}>
              {t('common.ok')}
            </Button>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
