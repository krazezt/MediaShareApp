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
      name: 'Home',
      component: Home,
      options: { title: t('navigation.home') },
    },
    {
      name: 'Components',
      component: Components,
      options: screenOptions.components,
    },
    {
      name: 'Articles',
      component: Articles,
      options: { title: t('navigation.articles') },
    },
    {
      name: 'Pro',
      component: Pro,
      options: screenOptions.pro,
    },
    {
      name: 'Profile',
      component: Profile,
      options: { headerShown: false },
    },
    {
      name: 'Register',
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
