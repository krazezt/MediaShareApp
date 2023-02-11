import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Button, Icon, IconButton, Popover, Stack } from 'native-base';
import { ThemeComponentSizeType } from 'native-base/lib/typescript/components/types';
import React, { useState } from 'react';
import { useTranslation } from '../../../hooks';
import ReportContentButton from './ReportContentButton';

export default function ContentSubMenuButton(props: {
  contentId: number;
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
            <Button
              variant="outline"
              colorScheme="purple"
              startIcon={<Icon as={FontAwesome} name="user-circle" />}>
              {t('common.author')}
            </Button>
            <ReportContentButton contentId={props.contentId} closeParentPopover={() => setMenuOpen(false)} />
          </Stack>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}
