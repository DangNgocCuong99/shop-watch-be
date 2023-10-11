export type IDataReturn = {
    status:boolean,
    data:unknown,
    message?:string
}

export type IErrorReturn = {
    status:boolean,
    message?:string
}

export enum typeStatus {
    inactive="inactive" ,
    active="active" ,
    delete="delete" 
  }
