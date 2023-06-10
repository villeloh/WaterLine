import { Setting, TripData } from '@/state/types'

export type Persistable = Setting | TripData
export const PersistableKeys = Object.keys({ ...Setting, ...TripData })
