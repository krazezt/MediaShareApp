import React, { useState, useEffect } from 'react';

import { useData, useTheme, useTranslation } from '../hooks/';
import { Block, Button, Image, Input, Text } from '../components/';
import NewContentStagger from '../components/Staggers/NewContentStagger';
import { ScrollView, Stack } from 'native-base';
import { EContentType } from '../constants/types';
import ImageViewerCard from '../components/MediaPlayerCards/ImageViewerCard';
import MusicPlayerCard from '../components/MediaPlayerCards/MusicPlayerCard';
import VideoPlayerCard from '../components/MediaPlayerCards/VideoPlayerCard';

enum ETabs {
  EXPLORE,
  TRENDING,
}

interface IPost {
  id: number;
  caption: string;
  type: EContentType;
  mediaURL: string;
  createdAt: string;
  content: {
    categories: { name: string }[];
    author: {
      avatarURL: string;
      name: string;
    };
  };
}

const Home = () => {
  const { t } = useTranslation();
  const { callAPI } = useData();
  const [tab, setTab] = useState<ETabs>(ETabs.EXPLORE);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { assets, colors, fonts, gradients, sizes } = useTheme();

  useEffect(() => {
    const getData = async () => {
      const res = await callAPI('GET_DASHBOARD_CONTENT', 'GET');
      if (res !== undefined) setPosts(res.data);
    };

    getData();
  }, [tab]);

  const handleChangeTabs = (toTab: ETabs) => {
    setTab(toTab);
  };

  return (
    <>
      <NewContentStagger />
      <Block>
        {/* search input */}
        <Block color={colors.card} flex={0} padding={sizes.padding}>
          <Input search placeholder={t('common.search')} />
        </Block>

        {/* toggle posts list */}
        <Block
          row
          flex={0}
          align="center"
          justify="center"
          color={colors.card}
          paddingBottom={sizes.sm}>
          <Button onPress={() => handleChangeTabs(ETabs.EXPLORE)}>
            <Block row align="center">
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                marginRight={sizes.s}
                width={sizes.socialIconSize}
                height={sizes.socialIconSize}
                gradient={
                  gradients?.[tab === ETabs.EXPLORE ? 'primary' : 'secondary']
                }>
                <Image source={assets.extras} color={colors.white} radius={0} />
              </Block>
              <Text
                p
                font={fonts?.[tab === ETabs.EXPLORE ? 'medium' : 'normal']}>
                {t('home.explore')}
              </Text>
            </Block>
          </Button>
          <Block
            gray
            flex={0}
            width={1}
            marginHorizontal={sizes.sm}
            height={sizes.socialIconSize}
          />
          <Button onPress={() => handleChangeTabs(ETabs.TRENDING)}>
            <Block row align="center">
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                marginRight={sizes.s}
                width={sizes.socialIconSize}
                height={sizes.socialIconSize}
                gradient={
                  gradients?.[tab === ETabs.TRENDING ? 'primary' : 'secondary']
                }>
                <Image
                  radius={0}
                  color={colors.white}
                  source={assets.documentation}
                />
              </Block>
              <Text
                p
                font={fonts?.[tab === ETabs.TRENDING ? 'medium' : 'normal']}>
                {t('home.trending')}
              </Text>
            </Block>
          </Button>
        </Block>

        {/* products list */}
        <Block
          scroll
          paddingHorizontal={10}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}>
          <Stack space={5}>
            {posts.map((item, index) => {
              switch (item.type) {
                case EContentType.IMAGE:
                  return (
                    <ImageViewerCard
                      avatarUri={item.content.author.avatarURL}
                      contentId={item.id}
                      imageUri={item.mediaURL}
                      key={index}
                      categories={item.content.categories}
                      author={item.content.author.name}
                      description={item.caption}
                    />
                  );
                case EContentType.MUSIC:
                  return (
                    <MusicPlayerCard
                      avatarUri={item.content.author.avatarURL}
                      contentId={item.id}
                      audioUri={item.mediaURL}
                      key={index}
                      categories={item.content.categories}
                      author={item.content.author.name}
                      description={item.caption}
                    />
                  );
                case EContentType.VIDEO:
                  return (
                    <VideoPlayerCard
                      avatarUri={item.content.author.avatarURL}
                      contentId={item.id}
                      videoUri={item.mediaURL}
                      key={index}
                      categories={item.content.categories}
                      author={item.content.author.name}
                      description={item.caption}
                    />
                  );

                default:
                  break;
              }
            })}
          </Stack>
        </Block>
      </Block>
    </>
  );
};

export default Home;
