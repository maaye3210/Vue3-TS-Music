export interface AlertParam{
  title:string, msg:string, ok:undefined|(()=>{}), okText:string
}
export interface ConfirmParam extends AlertParam{
  cancel:(()=>{})|undefined, cText:string|undefined
}
