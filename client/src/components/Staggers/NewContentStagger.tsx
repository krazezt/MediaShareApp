import React from 'react';
import {
  Box,
  useDisclose,
  IconButton,
  Stagger,
  HStack,
  Icon,
} from 'native-base';
import { Entypo } from '@expo/vector-icons';
import CreateContentButton from '../Buttons/CreateContentButtons/CreateContentButton';
import { EContentType } from '../../constants/types';

export default function NewContentStagger() {
  const { isOpen, onToggle } = useDisclose();
  return (
    <Box position="absolute" bottom={7} right={4} zIndex={99}>
      <Box alignItems="center">
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}>
          <CreateContentButton contentType={EContentType.MUSIC} />
          <CreateContentButton contentType={EContentType.VIDEO} />
          <CreateContentButton contentType={EContentType.IMAGE} />
        </Stagger>
      </Box>
      <HStack justifyContent="center">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          bg="cyan.400"
          icon={
            <Icon
              as={Entypo}
              size="8"
              name="plus"
              color="warmGray.50"
              _dark={{
                color: 'warmGray.50',
              }}
            />
          }
        />
      </HStack>
    </Box>
  );
}
