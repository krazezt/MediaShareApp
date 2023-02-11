import React from 'react';
import { Avatar, Box, Stack, Text } from 'native-base';
import { IComment } from '../constants/types';

export default function Comment(props: { comment: IComment }) {
  return (
    <Box display="flex">
      <Stack direction="row" space={1} display="flex">
        <Avatar
          position="relative"
          size="sm"
          bg="green.500"
          borderStyle="solid"
          borderWidth="1"
          borderColor="gray.400"
          source={{
            uri: props.comment.user.avatarURL,
          }}
        />
        <Text
          fontSize="md"
          fontWeight="bold"
          _dark={{
            color: 'coolGray.800',
          }}
          color="gray.500">
          {props.comment.user.name}
        </Text>
        <Box flexGrow={1}>
          <Text
            textAlign="right"
            fontSize="xs"
            italic
            _dark={{
              color: 'coolGray.800',
            }}
            color="gray.400">
            {props.comment.createdAt.split('T')[0]}
          </Text>
        </Box>
      </Stack>
      <Box alignItems="flex-end">
        <Box paddingX="2" paddingY="1" bgColor="blue.300" width="85%" bottom="3" minHeight="5" borderBottomRadius="xl" borderTopRightRadius="xl">
          {props.comment.commentContent}
        </Box>
      </Box>
    </Box>
  );
}
