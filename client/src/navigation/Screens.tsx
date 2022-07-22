import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Articles, Components, Home, Profile, Register, Pro } from '../screens';
import { useScreenOptions, useTranslation } from '../hooks';

const Stack = createStackNavigator();
interface StackNavigation {
  name: string;
  component: React.ComponentType<any>;
  options?: StackNavigationOptions;
}

export default () => {
  const { t } = useTranslation();
  const screenOptions = useScreenOptions();

  const routes: StackNavigation[] = [
    {
      name: t('screens.home'),
      component: Home,
      options: { title: t('navigation.home') },
    },
    {
      name: t('screens.components'),
      component: Components,
      options: screenOptions.components,
    },
    {
      name: t('screens.articles'),
      component: Articles,
      options: { title: t('navigation.articles') },
    },
    {
      name: t('screens.test'),
      component: Pro,
      options: screenOptions.pro,
    },
    {
      name: t('screens.profile'),
      component: Profile,
      options: { headerShown: false },
    },
    {
      name: t('screens.register'),
      component: Register,
      options: { headerShown: false },
    },
  ];

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      {routes.map((item) => {
        return (
          <Stack.Screen
            name={item.name}
            component={item.component}
            options={item.options}
            key={item.name}
          />
        );
      })}
    </Stack.Navigator>
  );
};
