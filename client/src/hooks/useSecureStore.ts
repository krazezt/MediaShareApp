import * as SecureStore from 'expo-secure-store';

export function useSecureStore() {
  async function saveData(key: string, value: Object | undefined) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  }

  async function getData(key: string): Promise<Object> {
    return JSON.parse((await SecureStore.getItemAsync(key)) as string);
  }

  return {saveData, getData};
}
