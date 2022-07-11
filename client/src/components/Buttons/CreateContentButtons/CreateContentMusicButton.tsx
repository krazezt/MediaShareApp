import React from 'react';
import {
  Modal,
  Button,
  Input,
  FormControl,
  IconButton,
  Icon,
} from 'native-base';
import { Entypo } from '@expo/vector-icons';

export default function CreateContentMusicButton() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input ref={initialRef} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setModalVisible(false);
                }}>
                Save
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
        onPress={() => {}}
      />
    </>
  );
}
