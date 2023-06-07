import AsyncStorage from '@react-native-async-storage/async-storage'
import { Persistable, TypeMap } from '@/state/Repository'

export default class AsyncStorageDS {
  saveData = async <T extends Persistable>(
    key: T,
    value: TypeMap[T],
  ): Promise<boolean> => {
    try {
      const stringValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, stringValue)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  loadData = async <T extends Persistable>(
    key: T,
  ): Promise<TypeMap[T] | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      if (jsonValue != null) {
        return JSON.parse(jsonValue) as TypeMap[T]
      } else {
        return null
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
