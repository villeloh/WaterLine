type Persistable = {
  mapType?: string
}

enum Key {
  mapType = 'mapType',
}

class Repository {
  saveLongTerm(key: Key, value: Persistable) {
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
