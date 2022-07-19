import React, { useCallback, useEffect } from 'react';
import { Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import { Block, Button, Image, Text } from '../components/';
import { useData, useTheme, useTranslation } from '../hooks/';
import { ChangeAvatarButton } from '../components/Buttons/ChangeAvatarButton';

const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const { user, handleUser, callAPI, setAccessToken } = useData();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const handleSocialLink = useCallback(
    (type: 'twitter' | 'dribbble') => {
      const url =
        type === 'twitter'
          ? `https://twitter.com/${user?.social?.twitter}`
          : `https://dribbble.com/${user?.social?.dribbble}`;
      try {
        Linking.openURL(url);
      } catch (error) {
        alert(`Cannot open URL: ${url}`);
      }
    },
    [user],
  );

  const getUserInfo = async () => {
    const user: any = await callAPI('ME', 'GET');
    if (user === undefined) navigation.navigate(t('screens.register'));
    else
      handleUser({
        id: 1,
        name: user.data.name,
        department: 'Krazezt ~!',
        stats: {
          posts: 0,
          followers: 0,
          following: 0,
        },
        about: 'About me!',
        avatar: user.data.avatarURL,
        social: { twitter: 'https://twitter.com/krazezt' },
      });
  };

  useEffect(() => {
    const defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/mediashare-7dd4d.appspot.com/o/Avatars%2Fdefault.png?alt=media&token=7de5f2e3-c35d-4c71-b324-a9191653c8c3";
    handleUser({
      id: 1,
      name: '',
      department: '',
      stats: {
        posts: 0,
        followers: 0,
        following: 0,
      },
      about: '',
      avatar: defaultAvatar,
      social: { twitter: 'https://twitter.com/krazezt' },
    });
    getUserInfo();
  }, []);

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.padding }}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}>
            <Block row align="center" justify="space-between">
              <Button
                row
                flex={0}
                justify="flex-start"
                onPress={() => (navigation as any).openDrawer()}>
                <Image
                  radius={0}
                  width={10}
                  height={18}
                  color={colors.white}
                  source={assets.arrow}
                  transform={[{ rotate: '180deg' }]}
                />
                <Text p white marginLeft={sizes.s}>
                  {t('common.goBack')}
                </Text>
              </Button>
              <ChangeAvatarButton />
            </Block>
            <Block flex={0} align="center">
              <Image
                width={80}
                height={80}
                marginBottom={sizes.sm}
                source={{ uri: user?.avatar }}
              />
              <Text h5 center white>
                {user?.name}
              </Text>
              <Block row marginVertical={sizes.m}>
                <Button
                  white
                  outlined
                  shadow={false}
                  radius={sizes.m}
                  onPress={() => {
                    alert(`Follow ${user?.name}`);
                  }}>
                  <Block
                    justify="center"
                    radius={sizes.m}
                    paddingHorizontal={sizes.m}
                    color="rgba(255,255,255,0.2)">
                    <Text white bold transform="uppercase">
                      {t('common.follow')}
                    </Text>
                  </Block>
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  marginHorizontal={sizes.sm}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  onPress={() => handleSocialLink('twitter')}>
                  <Ionicons
                    size={18}
                    name="logo-twitter"
                    color={colors.white}
                  />
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  onPress={() => {
                    setAccessToken('');
                    navigation.navigate(t('screens.register'));
                  }}>
                  <Ionicons
                    size={18}
                    name="log-out-outline"
                    color={colors.white}
                  />
                </Button>
              </Block>
            </Block>
          </Image>

          {/* profile: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text h5>{user?.stats?.posts}</Text>
                <Text>{t('profile.posts')}</Text>
              </Block>
              <Block align="center">
                <Text h5>
                  {(user?.stats?.followers || 0) >= 1000
                    ? Math.round((user?.stats?.followers || 0) / 1000) + 'k'
                    : user?.stats?.followers || 0}
                </Text>
                <Text>{t('profile.followers')}</Text>
              </Block>
              <Block align="center">
                <Text h5>
                  {(user?.stats?.following || 0) >= 1000
                    ? Math.round((user?.stats?.following || 0) / 1000) + 'k'
                    : user?.stats?.following || 0}
                </Text>
                <Text>{t('profile.following')}</Text>
              </Block>
            </Block>
          </Block>

          {/* profile: about me */}
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('profile.aboutMe')}
            </Text>
            <Text p lineHeight={26}>
              {user?.about}
            </Text>
          </Block>

          {/* profile: photo album */}
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block row align="center" justify="space-between">
              <Text h5 semibold>
                {t('common.posts')}
              </Text>
              <Button>
                <Text p primary semibold>
                  {t('common.viewall')}
                </Text>
              </Button>
            </Block>
            <Block row justify="space-between" wrap="wrap">
              <Image
                resizeMode="cover"
                source={assets?.photo1}
                style={{
                  width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                  height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                }}
              />
              <Block marginLeft={sizes.m}>
                <Image
                  resizeMode="cover"
                  source={assets?.photo2}
                  marginBottom={IMAGE_VERTICAL_MARGIN}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
                <Image
                  resizeMode="cover"
                  source={assets?.photo3}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
