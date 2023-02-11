import { Box, ScrollView, Stack } from 'native-base';
import React from 'react';
import { IComment } from '../../constants/types';
import Comment from '../Comment';

export default function (props: { comments: IComment[] }) {
  return (
    <Box height="72">
      <ScrollView>
        <Stack direction="column">
          {props.comments.map((item) => (
            <Comment key={item.id} comment={item}/>
          ))}
        </Stack>
      </ScrollView>
    </Box>
  );
}
