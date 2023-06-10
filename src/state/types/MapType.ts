export const MAP_TYPES = ['satellite', 'standard'] as const
export type MapType = (typeof MAP_TYPES)[number]
