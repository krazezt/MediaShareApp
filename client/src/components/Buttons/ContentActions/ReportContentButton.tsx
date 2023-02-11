import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { AxiosError } from 'axios';
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  Input,
  Modal,
  Stack,
  useToast,
  Alert as NBAlert,
  VStack,
  Text,
  Box,
} from 'native-base';
import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useData, useTranslation } from '../../../hooks';

export default function ReportContentButton(props: {
  contentId: number;
  closeParentPopover: () => any;
}) {
  const finalRef = useRef(null);
  const { t } = useTranslation();
  const { callAPI } = useData();
  const toast = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');

  const submitReport = async () => {
    try {
      const data = {
        reason: reason,
        contentId: props.contentId,
      };

      const res = await callAPI('CREATE_REPORT', 'POST', data);
      if (res?.status === 201) {
        setOpen(false);
        setReason('');
        props.closeParentPopover();
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
                    {t('common.createReportSuccess')}
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
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{t('headers.report')}</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Stack direction="row">
                <Input
                  mt="2"
                  height="10"
                  width="83%"
                  placeholder={t('placeHolder.newReport')}
                  value={reason}
                  onChangeText={(text) => setReason(text)}
                />
                <IconButton
                  icon={
                    <Icon
                      as={MaterialCommunityIcons}
                      name={reason === '' ? 'send' : 'send-check'}
                      size="6rem"
                      color="purple.400"
                    />
                  }
                  isDisabled={reason === ''}
                  onPress={submitReport}
                />
              </Stack>
            </FormControl>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Button
        variant="subtle"
        colorScheme="red"
        startIcon={<Icon as={AntDesign} name="warning" color="red.300" />}
        onPress={() => setOpen(true)}>
        Report
      </Button>
    </>
  );
}
