import { Entypo } from '@expo/vector-icons';
import { Icon, IconButton, Popover, Stack } from 'native-base';
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types';
import React, { useState } from 'react';
import GetPrivateKeyButton from '../../ContentActions/GetPrivateKeyButton';

export default function CollectionMenuButtonMe(props: {
  contentId: number;
  authorId: number;
  size: ThemeComponentSizeType<'Icon'>;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <Popover
      isOpen={menuOpen}
      onClose={() => setMenuOpen(false)}
      trigger={(triggerProps) => (
        <IconButton
          height={props.size}
          width={props.size}
          {...triggerProps}
          icon={
            <Icon
              as={Entypo}
              name="menu"
              size={props.size}
              color="purple.400"
            />
          }
          onPress={() => setMenuOpen(true)}
        />
      )}>
      <Popover.Content>
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Body>
          <Stack direction="column" minWidth="32" space={2}>
            <GetPrivateKeyButton contentId={props.contentId} size="md" />
          </Stack>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
