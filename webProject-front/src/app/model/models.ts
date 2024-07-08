export type Product = {
  id?: number,
  name: string,
  description: string,
  rating: number,
  price:number,
  discount:number,
  category?: Category,
  imgUrl?: string,
  quantity:number,
}

export type Account = {

    nickName:string,
    logined:boolean,
    isManager: boolean,
    isEmpty:boolean,
}

export type User = {

    id:number,
    username:string,
    role:Role,
    accountNonLocked:boolean
}


export enum Role{

    ROLE_ADMIN,
    ROLE_USER
}


export enum Category {
    SHOES,
    CLOTHING,
    ACCESSORIES,
    EQUIPMENT
}
