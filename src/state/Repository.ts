export type MapType = 'satellite' | 'standard'

export type Persistable = {
  mapType?: MapType
}

export enum Setting {
  mapType = 'mapType',
}

class Repository {
  saveLongTerm(key: Setting, value: Persistable) {
    //TODO
  }

  saveShortTerm() {
    //TODO
  }

  load() {
    //TODO
  }
}

export const Repo = new Repository()
