import { Entypo } from '@expo/vector-icons';
import { Icon, IconButton, Popover, Stack } from 'native-base';
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types';
import React, { useState } from 'react';
import { useTranslation } from '../../../hooks';
import JoinCollectionButton from '../Collection/JoinCollectionButton/JoinCollectionButton';
import NavigateUserButton from '../NavigateUserButton';
import ReportContentButton from './ReportContentButton';

export default function ContentSubMenuButton(props: {
  contentId: number;
  authorId: number;
  size: ThemeComponentSizeType<'Icon'>;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { t } = useTranslation();

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
              color="violet.400"
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
            <NavigateUserButton
              userId={props.authorId}
              text={t('common.author')}
            />
            <ReportContentButton
              contentId={props.contentId}
              closeParentPopover={() => setMenuOpen(false)}
            />
          </Stack>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
