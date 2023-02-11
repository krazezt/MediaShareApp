import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Icon } from 'native-base';

export default function AddToCollectionButton(props: { contentId: number }) {
  return (
    <Box marginTop="2">
      <Icon
        right="50%"
        as={MaterialCommunityIcons}
        name="bookmark-check-outline"
        size="6rem"
        color="purple.400"
      />
    </Box>
  );
}
