export type contextinitialState = {
  number: number,
  token:string,
  thema: true,
  texto: number,
  baralhoItems: object,
  currentUserData: object,
  setCurrentUserData: () => void,
  setToken: () => void,
  logout: () => void,
  setThema: (thema:any) => void,
  setNumber: (number:any) => void,
  setTexto: (texto:any) => void,
  setBaralhoItems: (baralhoItems:any) => void
}