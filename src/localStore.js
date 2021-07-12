const storage = window.localStorage

export function saveStorageObj(key, obj) {
  const strObj = JSON.stringify(obj)
  storage.setItem(key, strObj)
}

export function readStorageObj(key) {
  return JSON.parse(storage.getItem(key))
}
