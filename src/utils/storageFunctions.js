export function getStorage(key) {
  const data = localStorage.getItem(key);
  return data;
}

export function SetStorage(key, value) {
  const data = localStorage.setItem(key, value);
}

export function RemoveStorage(key){
  localStorage.removeItem(key)
}