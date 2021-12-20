

export function getStorage(item: string) {
  let get: any = localStorage.getItem(item);
  let parser = JSON.parse(get);

  return parser;
}

export function setStorage(item: string, value: any) {
  let valor = JSON.stringify(value);
  localStorage.setItem(item, valor);
}
