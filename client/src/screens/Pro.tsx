import React, { useCallback, useEffect } from 'react';
import { Linking, StatusBar } from 'react-native';

import { useTheme, useTranslation } from '../hooks/';
import { Image } from '../components/';
import NewContentStagger from '../components/Staggers/NewContentStagger';
import { Center } from 'native-base';
import VideoPlayerCard from '../components/MediaPlayerCards/VideoPlayerCard';

const Pro = () => {
  const { t } = useTranslation();
  const { assets, colors, gradients, sizes } = useTheme();

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

  const handleWebLink = useCallback((url) => Linking.openURL(url), []);

  return (
    <Image
      background
      source={assets.background}
      padding={sizes.padding}
      style={{ flex: 1 }}>
      <NewContentStagger />
      <Center flex={1} px="4">
        <VideoPlayerCard
          contentId={1}
          avatarUri="https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg"
          categories={[
            { name: 'Category 1' },
            { name: 'Category 2' },
            { name: 'Category 3' },
          ]}
          videoUri="https://firebasestorage.googleapis.com/v0/b/mediashare-7dd4d.appspot.com/o/Videos%2Fc2dd5f58-f3f5-4a14-88c2-492b247f8bd3.mp4?alt=media&token=5675e9f3-bef0-4c6a-bf04-d0d29faaa44a"
        />
      </Center>

      {/* <Block safe justify="center">
        <Block card flex={0} padding={sizes.sm} marginBottom={sizes.sm}>
          <Text h4 center semibold marginBottom={sizes.sm}>
            {t('pro.title')}
          </Text>

          <Text marginBottom={sizes.padding}>{t('pro.appTemplate')}</Text>

          <Text semibold>{t('pro.components', {count: 11})}</Text>
          <Text semibold>{t('pro.screens', {count: 18})}</Text>
          <Text semibold>{t('pro.support')}</Text>

          <Text marginVertical={sizes.padding}>{t('pro.saveTime')}</Text>

          <Text>{t('pro.takeAdvantage')}</Text>

          <Block
            row
            flex={0}
            justify="space-evenly"
            marginVertical={sizes.padding}>
            <Image
              source={assets.ios}
              color={colors.icon}
              style={{height: 38, width: 82}}
            />
            <Image
              source={assets.android}
              color={colors.icon}
              style={{height: 38, width: 140}}
            />
          </Block>

          <Button
            gradient={gradients.primary}
            onPress={() =>
              handleWebLink(
                'https://www.creative-tim.com/product/soft-ui-pro-react-native',
              )
            }>
            <Text white bold transform="uppercase">
              {t('pro.buyNow')}
            </Text>
          </Button>
        </Block>
      </Block> */}
    </Image>
  );
};

export default Pro;
