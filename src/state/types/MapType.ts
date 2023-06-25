export const MAP_TYPES = ['satellite', 'standard'] as const // TODO: get rid of it somehow
export type MapType = (typeof MAP_TYPES)[number]
