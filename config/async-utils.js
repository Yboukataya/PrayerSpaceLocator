import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMyObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(String(key));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
    console.log('uh oh');
    console.log(e);
  }
  console.log('Done.');
};

export const storeObj = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const storeData = async (key, value) => {
  console.log('GOTCHA DATA BOY');
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

export const getData = async (key) => {
  try {
    return await AsyncStorage.getItem(String(key));
  } catch (e) {
    // error reading value
  }
};
